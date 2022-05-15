import { Box, Button, Divider, HStack, Spacer, Switch } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { requestHttpGet, requestHttpPatch } from '../scripts/requestBase';
import { delToken } from '../scripts/requestAuth';

type SettingObj = {
  id: string;
  receive_visit_notice: boolean;
  receive_shop_notice: boolean;
  push_visit_notice: boolean;
};

export const SettingsScreen = ({ navigation }) => {
  const [notice, setNotice] = useState(true);
  const [settingObj, setSettingObj] = useState<SettingObj>({
    id: '',
    receive_visit_notice: true,
    receive_shop_notice: true,
    push_visit_notice: true,
  });

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const res = await requestHttpGet('/api/v1/sns/setting/');
    console.log('getSettings', res.data[0]);
    if (res.data.length) {
      const {
        id,
        receive_visit_notice,
        receive_shop_notice,
        push_visit_notice,
      } = res.data[0];
      setSettingObj((pre) => ({
        ...pre,
        id,
        receive_visit_notice,
        receive_shop_notice,
        push_visit_notice,
      }));
    }
  };

  const handleChange = async (type: 'rcvShop' | 'rcvVisit' | 'pshVisit') => {
    console.log(settingObj);
    const param =
      type === 'rcvShop'
        ? {
            receive_shop_notice: !settingObj.receive_shop_notice,
          }
        : type === 'rcvVisit'
        ? {
            receive_visit_notice: !settingObj.receive_visit_notice,
          }
        : {
            push_visit_notice: !settingObj.push_visit_notice,
          };
    console.log(`/api/v1/sns/setting/${settingObj.id}/`);
    const res = await requestHttpPatch(
      `/api/v1/sns/setting/${settingObj.id}/`,
      param
    );

    const setParam =
      type === 'rcvShop'
        ? {
            receive_shop_notice: res.data.receive_shop_notice,
          }
        : type === 'rcvVisit'
        ? {
            receive_visit_notice: res.data.receive_visit_notice,
          }
        : {
            push_visit_notice: res.data.push_visit_notice,
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
            value={settingObj.receive_shop_notice}
          />
        </HStack>
        <HStack alignItems="center" p={2}>
          <Text>友達来店の通知</Text>
          <Spacer />
          <Switch
            size="sm"
            onTrackColor="green.400"
            onToggle={() => handleChange('rcvVisit')}
            value={settingObj.receive_visit_notice}
          />
        </HStack>
        <HStack alignItems="center" p={2}>
          <Text>友達への来店通知</Text>
          <Spacer />
          <Switch
            size="sm"
            onTrackColor="green.400"
            onToggle={() => handleChange('pshVisit')}
            value={settingObj.push_visit_notice}
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
