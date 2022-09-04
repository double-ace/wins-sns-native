import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  Stack,
  Button,
  Select,
  Radio,
  Link,
  KeyboardAvoidingView,
  Box,
  Center,
  HStack,
} from 'native-base';
import { requestHttpPost } from '../scripts/requestBase';
import { prefectures } from '../../assets/prefectures.json';
import { delToken } from '../scripts/requestAuth';

export const RegistUserInfoScreen = ({ navigation }: any) => {
  const [familyName, setfamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState({ prefecture: '', city: '' });
  const [hearFrom, setHearFrom] = useState('');
  const [introduced, setIntroduced] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [hopeRate, setHopeRate] = useState('0.5');
  const [invalid, setInvalid] = useState(false);

  const hearFromList: string[] = [
    '麻雀王国',
    'Twitter',
    '看板',
    '紹介',
    'その他',
  ];

  const hopeRateList: string[] = ['0.5', '1.0', 'どちらでも'];

  // 都道府県選択リスト
  const prefectureItem = prefectures.map(({ name, code }) => {
    return <Select.Item label={name} key={code.toString()} value={name} />;
  });

  // 来店きっかけ選択リスト
  const hearFromItem = hearFromList.map((item, index) => {
    return (
      <Radio value={item} key={index.toString()} mr="2" colorScheme="green">
        {item}
      </Radio>
    );
  });

  // 希望レート選択リスト
  const hopeRateItem = hopeRateList.map((item, index) => {
    return (
      <Radio value={item} key={index.toString()} mr="2" colorScheme="green">
        {item}
      </Radio>
    );
  });

  const formatBirthDate = () => {
    let inputVal = birthDate;
    inputVal = inputVal.replace(/[^0-9]/gi, '');
    console.log(inputVal);
    const year = inputVal.substring(0, 4);
    const afterYear = inputVal.substring(4);
    let month;
    let date;
    if (afterYear.length === 2) {
      month = '0' + inputVal.substring(4, 5);
      date = '0' + inputVal.substring(5, 6);
    } else if (afterYear.length === 3) {
      month = '0' + inputVal.substring(4, 5);
      date = inputVal.substring(5, 7);
    } else if (afterYear.length === 4) {
      month = inputVal.substring(4, 6);
      date = inputVal.substring(6, 8);
    }

    const formatedDate = `${year}/${month}/${date}`;
    setBirthDate(formatedDate);
  };

  const regist = async () => {
    const formItem = {
      familyName: familyName,
      firstName: firstName,
      nickname: familyName + ' ' + firstName,
      birthDate: birthDate.split('/').join('-'),
      addressPrefecture: address.prefecture,
      addressCity: address.city,
      hearFrom: hearFrom,
      introduced: hearFrom === '紹介' ? introduced : null,
      phoneNumber: phoneNum,
      hopeRate: hopeRate,
    };
    console.log(formItem);
    const ProfRes = await requestHttpPost(
      '/api/v1/user/profile/',
      formItem,
      true
    );
    if (ProfRes.result) {
      const settingParam = {
        receiveVisitNotice: true,
        receiveShopNotice: true,
        pushVisitNotice: true,
      };

      await requestHttpPost('/api/v1/core/user-info/', {}, true);
      await requestHttpPost('/api/v1/sns/setting/', settingParam, true);
      await requestHttpPost('/api/v1/sns/sns-profiles/', {}, true);
      await requestHttpPost('/api/v1/chat/rooms/create/', {}, true);
    }
    console.log(ProfRes.result, ProfRes.data);
    if (ProfRes.result) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main', params: { userId: ProfRes.data.user } }],
        })
      );
    }
  };

  const handleBackLogin = () => {
    Alert.alert('ログイン画面へ戻りますか？', '', [
      { text: 'キャンセル' },
      {
        text: 'ログイン画面',
        onPress: async () => {
          await delToken();
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.inner}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        h={{ base: '700px', lg: 'auto' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.container}>
          {invalid ? (
            <Text mb={8} color="red.500">
              メールアドレスまたはパスワードが正しくありません
            </Text>
          ) : null}
          <Stack px={2}>
            <Box>
              <Text mb={1}>お名前</Text>
              <HStack justifyContent="space-between">
                <TextInput
                  style={[styles.input, styles.nameInput]}
                  value={familyName}
                  onChangeText={(text) => setfamilyName(text)}
                  textContentType="familyName"
                  placeholder="姓"
                />
                <TextInput
                  style={[styles.input, styles.nameInput]}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  textContentType="givenName"
                  placeholder="名"
                />
              </HStack>
            </Box>
            <Box>
              <Text mb={1}>生年月日</Text>
              <TextInput
                style={styles.input}
                value={birthDate}
                onChangeText={(text) => setBirthDate(text)}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                placeholder="19920304"
                onBlur={formatBirthDate}
              />
            </Box>
            <Box>
              <Text mb={1}>お住まい</Text>
              <HStack justifyContent="space-between">
                <Select
                  selectedValue={address.prefecture}
                  minWidth="100"
                  borderWidth={0}
                  bg="white"
                  onValueChange={(val) =>
                    setAddress({ ...address, prefecture: val })
                  }
                >
                  {prefectureItem}
                </Select>
                <TextInput
                  style={[styles.input, styles.nameInput]}
                  value={address.city}
                  onChangeText={(val) => setAddress({ ...address, city: val })}
                  textContentType="givenName"
                  placeholder="市区町村"
                />
              </HStack>
            </Box>
            <Stack my="4">
              <Text mb={1}>ご来店のきっかけ</Text>
              <Radio.Group
                name="hearFromRadioGroup"
                value={hearFrom}
                onChange={(val) => setHearFrom(val)}
              >
                <Stack direction={{ base: 'row' }} flexWrap="wrap">
                  {hearFromItem}
                </Stack>
              </Radio.Group>
            </Stack>
            {hearFrom === '紹介' ? (
              <Box>
                <Text mb={1}>ご紹介者様</Text>
                <TextInput
                  style={styles.input}
                  value={introduced}
                  onChangeText={(text) => setIntroduced(text)}
                  textContentType="emailAddress"
                  placeholder="麻雀太郎"
                />
              </Box>
            ) : null}

            <Box>
              <Text mb={1}>お電話番号</Text>
              <TextInput
                style={styles.input}
                value={phoneNum}
                onChangeText={(text) => setPhoneNum(text)}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                placeholder="09012345678"
              />
            </Box>
            <Stack my="4">
              <Text mb={1}>ご希望レート</Text>
              <Radio.Group
                name="hopeRateRadioGroup"
                value={hopeRate}
                onChange={(val) => setHopeRate(val)}
              >
                <Stack direction={{ base: 'row' }} flexWrap="wrap">
                  {hopeRateItem}
                </Stack>
              </Radio.Group>
            </Stack>
            <Button
              onPress={regist}
              bg="green.400"
              my={4}
              _pressed={{ backgroundColor: 'green.500' }}
              _text={{ color: '#fff' }}
            >
              登録
            </Button>
            <Center>
              <Link onPress={handleBackLogin} _text={{ color: 'primary.600' }}>
                ログイン画面へ戻る
              </Link>
            </Center>
          </Stack>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  inner: {
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    height: 48,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  nameInput: {
    width: '49%',
  },
  cityInput: {
    width: '50%',
  },
});
