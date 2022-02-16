import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  Flex,
  Button,
  Modal,
  HStack,
  Center,
  Text,
  Box,
  Spacer,
} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { format } from 'date-fns';
import { requestHttpGet } from '../scripts/requestBase';

type PointHistory = {
  id: string | number;
  point: string;
  content: string;
  date: Date | string;
};

export const HomeScreen = () => {
  const [point, setPoint] = useState(0);
  const [userId, setUserId] = useState('');
  const [pointHisList, setPointHisList] = useState<PointHistory[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    getUserPoint();
  }, []);

  const getUserPoint = async () => {
    const pointRes = await requestHttpGet('/api/v1/user/point/');
    if (pointRes.data.length) {
      setPoint(pointRes.data[0].point.toLocaleString());
      setUserId(pointRes.data[0].user);
    }

    const pointHisRes = await requestHttpGet('/api/v1/user/point-history/');
    if (pointHisRes.data.length) {
      // date_timeを降順に並び替え
      pointHisRes.data.sort((a, b) => {
        return a.date_time < b.date_time ? 1 : -1;
      });
      pointHisRes.data;
      setPointHisList(
        pointHisRes.data.map((item) => {
          // 当日なら時刻表示しない　当年なら年表示しない
          return {
            ...item,
            date_time: format(new Date(item.date_time), 'yyyy/MM/dd HH:mm'),
          };
        })
      );
    }
  };

  const renderItem = ({ item }) => {
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
          {item.point}pt
        </Text>
      </HStack>
    );
  };

  return (
    <Box style={{ flex: 1 }} bg="white">
      <Flex justifyContent="center" alignItems="center" bg="white" py={10}>
        <Center
          h={190}
          w={190}
          borderRadius={100}
          borderWidth={15}
          borderColor="#00EFF0"
        >
          <Text fontSize={30}>{point}pt</Text>
        </Center>
        <View>
          <Modal isOpen={showQRCode} onClose={() => setShowQRCode(false)}>
            <Modal.CloseButton
              onPress={() => setShowQRCode(false)}
              position="absolute"
              top="16"
            />
            <QRCode size={200} value={userId} />
          </Modal>
          <Button
            w={250}
            h={45}
            borderRadius={100}
            bg="green.400"
            my="6"
            _text={{ fontSize: 16, fontWeight: 'bold' }}
            onPress={() => setShowQRCode(true)}
          >
            QRコード表示
          </Button>
        </View>
      </Flex>
      <Box
        bg="white"
        borderBottomWidth={1}
        borderColor="#E9EAEB"
        _text={{ fontSize: 16, paddingLeft: 2 }}
      >
        ポイント履歴
      </Box>
      <FlatList data={pointHisList} renderItem={renderItem} scrollEnabled />
    </Box>
  );
};
