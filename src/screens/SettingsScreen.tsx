import { Box, Button, Divider, HStack, Spacer, Switch } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { requestHttpGet, requestHttpPatch } from '../scripts/requestBase';
import { delToken } from '../scripts/requestAuth';

type SettingObj = {
  id: string;
  receiveVisitNotice: boolean;
  receiveShopNotice: boolean;
  pushVisitNotice: boolean;
};

export const SettingsScreen = ({ navigation }) => {
  const [notice, setNotice] = useState(true);
  const [settingObj, setSettingObj] = useState<SettingObj>({
    id: '',
    receiveVisitNotice: true,
    receiveShopNotice: true,
    pushVisitNotice: true,
  });

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const res = await requestHttpGet('/api/v1/sns/setting/');
    console.log('getSettings', res.data[0]);
    if (res.data.length) {
      const { id, receiveVisitNotice, receiveShopNotice, pushVisitNotice } =
        res.data[0];
      setSettingObj((pre) => ({
        ...pre,
        id,
        receiveVisitNotice,
        receiveShopNotice,
        pushVisitNotice,
      }));
    }
  };

  const handleChange = async (type: 'rcvShop' | 'rcvVisit' | 'pshVisit') => {
    console.log(settingObj);
    const param =
      type === 'rcvShop'
        ? {
            receiveShopNotice: !settingObj.receiveShopNotice,
          }
        : type === 'rcvVisit'
        ? {
            receiveVisitNotice: !settingObj.receiveVisitNotice,
          }
        : {
            pushVisitNotice: !settingObj.pushVisitNotice,
          };
    console.log(`/api/v1/sns/setting/${settingObj.id}/`);
    const res = await requestHttpPatch(
      `/api/v1/sns/setting/${settingObj.id}/`,
      param
    );

    const setParam =
      type === 'rcvShop'
        ? {
            receiveShopNotice: res.data.receiveShopNotice,
          }
        : type === 'rcvVisit'
        ? {
            receiveVisitNotice: res.data.receiveVisitNotice,
          }
        : {
            pushVisitNotice: res.data.pushVisitNotice,
          };

    setSettingObj((prev) => ({ ...prev, ...setParam }));
  };

  const handleAlertLogout = () => {
    Alert.alert('ログアウトしますか？', '', [
      { text: 'キャンセル' },
      { text: 'ログアウト', onPress: logout },
    ]);
  };
  const logout = async () => {
    try {
      await delToken();
      navigation.navigate('SignIn');
    } catch (e) {
      console.log('logoutError========');
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Box bg="white" borderBottomWidth={1} borderColor="gray.100">
        <Box
          mt={4}
          pl={2}
          pb={1}
          _text={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }}
        >
          通知
        </Box>
        <HStack alignItems="center" p={2}>
          <Text>お店からの通知</Text>
          <Spacer />
          <Switch
            size="sm"
            onTrackColor="green.400"
            onToggle={() => handleChange('rcvShop')}
            value={settingObj.receiveShopNotice}
          />
        </HStack>
        <HStack alignItems="center" p={2}>
          <Text>友達来店の通知</Text>
          <Spacer />
          <Switch
            size="sm"
            onTrackColor="green.400"
            onToggle={() => handleChange('rcvVisit')}
            value={settingObj.receiveVisitNotice}
          />
        </HStack>
        <HStack alignItems="center" p={2}>
          <Text>友達への来店通知</Text>
          <Spacer />
          <Switch
            size="sm"
            onTrackColor="green.400"
            onToggle={() => handleChange('pshVisit')}
            value={settingObj.pushVisitNotice}
          />
        </HStack>
        <Divider my={2} />
        <Box
          mt={3}
          pl={2}
          pb={1}
          _text={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }}
        >
          アカウント
        </Box>
        <Button
          p={2}
          variant="ghost"
          colorScheme="secondary"
          textAlign="left"
          _text={{ textAlign: 'left' }}
          onPress={handleAlertLogout}
        >
          ログアウト
        </Button>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
});
