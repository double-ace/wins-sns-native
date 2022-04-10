import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import {
  Flex,
  Button,
  Modal,
  HStack,
  Center,
  Text,
  Box,
  Spacer,
  Divider,
  Image,
  Badge,
} from 'native-base';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import QRCode from 'react-native-qrcode-svg';
import { format } from 'date-fns';
import { requestHttpGet, requestHttpPost } from '../scripts/requestBase';

type PointHistory = {
  id: string | number;
  point: string;
  content: string;
  date: Date | string;
};

type PointHistoryResponse = {
  id: string | number;
  point: number;
  content: string;
  date_time: Date | string;
};

export const HomeScreen = ({ navigation }) => {
  const [point, setPoint] = useState(0);
  const [continuousVisit, setContinuousVisit] = useState(0);
  const [userId, setUserId] = useState('');
  const [pointHisList, setPointHisList] = useState<PointHistoryResponse[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const regPushNotifications = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        //②初回起動時は許可ダイアログを出してユーザからPush通知の許可を取得
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // 許可がない場合
        alert('Failed to get push token for push notification');
        return;
      }
      try {
        const endpoint = '/api/v1/core/user-device/';
        const tokenRes = await requestHttpGet(endpoint);
        alert(tokenRes.data.length);
        if (!tokenRes.data.length) {
          token = (await Notifications.getExpoPushTokenAsync()).data;
          alert(token);
          console.log(token);
          await requestHttpPost(endpoint, { device_token: token }, true);
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert('token');
    }
  };

  useEffect(() => {
    regPushNotifications();
    getUserPoint();
  }, []);

  const getUserPoint = async () => {
    const pointRes = await requestHttpGet('/api/v1/user/point/');
    const pointHisRes = await requestHttpGet('/api/v1/user/point-history/');

    if (pointRes.notLogin || pointHisRes.notLogin) {
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    } else {
      if (pointRes.data.length) {
        console.log(pointRes.data[0]);
        setPoint(pointRes.data[0].point.toLocaleString());
        setContinuousVisit(pointRes.data[0].continuous_visit_count);
        setUserId(pointRes.data[0].user);
      }
      if (pointHisRes.data.length) {
        // date_timeを降順に並び替え
        pointHisRes.data.sort(
          (a: PointHistoryResponse, b: PointHistoryResponse) => {
            return a.date_time < b.date_time ? 1 : -1;
          }
        );
        setPointHisList(
          pointHisRes.data.map((item: PointHistoryResponse) => {
            // 当日なら時刻表示しない　当年なら年表示しない
            return {
              ...item,
              date_time: format(new Date(item.date_time), 'yyyy/MM/dd HH:mm'),
            };
          })
        );
      }
    }
  };

  const refreshItem = async () => {
    setRefreshing(true);
    await getUserPoint();
    setRefreshing(false);
  };

  const renderItem = ({ item }: ListRenderItemInfo<PointHistoryResponse>) => {
    return (
      <HStack
        justifyContent="space-between"
        px="2"
        py="6"
        bg="white"
        borderBottomWidth={1}
        borderColor="blueGray.200"
        key={item.id}
      >
        <Text mr={2} color="blueGray.600">
          {item.date_time}
        </Text>
        <Text>{item.content}</Text>
        <Spacer />
        <Text color={item.point < 0 ? 'red.500' : 'info.500'}>
          {item.point.toLocaleString()}pt
        </Text>
      </HStack>
    );
  };

  return (
    <Box style={{ flex: 1 }} bg="white">
      <Badge
        m={1}
        maxWidth={40}
        colorScheme="success"
        alignSelf="flex-start"
        borderRadius={4}
        variant="outline"
      >
        {`連続来店回数: ${continuousVisit}`}
      </Badge>
      <Flex justifyContent="center" alignItems="center" bg="white" my={4}>
        <Center
          h={190}
          w={190}
          borderRadius={100}
          borderWidth={15}
          borderColor="#00EFF0"
        >
          <Text color="emerald.600" fontSize={30} fontWeight="bold">
            {point}pt
          </Text>
        </Center>
        <Box>
          <Modal isOpen={showQRCode} onClose={() => setShowQRCode(false)}>
            <Center bg="white" p={12} borderRadius={24}>
              <Modal.CloseButton
                onPress={() => setShowQRCode(false)}
                position="absolute"
                top={3}
              />
              <QRCode size={200} value={userId} />
            </Center>
          </Modal>
          <Button
            w={250}
            h={45}
            borderRadius={100}
            bg="green.400"
            _pressed={{ backgroundColor: 'green.500' }}
            my="6"
            _text={{ fontSize: 20, fontWeight: 'bold' }}
            onPress={() => setShowQRCode(true)}
          >
            QRコード表示
          </Button>
        </Box>
        <Image
          source={require('../../assets/hourses.png')}
          alt="header-logo"
          w={250}
          h={60}
        />
      </Flex>
      <Box
        bg="white"
        _text={{
          fontSize: 16,
          paddingLeft: 2,
          color: 'blueGray.700',
          fontWeight: 'bold',
        }}
      >
        ポイント履歴
      </Box>
      <Divider />
      <FlatList
        data={pointHisList}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            onRefresh={refreshItem}
            refreshing={refreshing}
            tintColor="#6ee7b7"
          />
        }
        scrollEnabled
      />
    </Box>
  );
};
