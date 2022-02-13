import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {
  Text as NBText,
  Stack,
  Button,
  Select,
  Radio,
  Link,
  KeyboardAvoidingView,
} from 'native-base';
import { requestHttpPost } from '../scripts/requestBase';
import { prefectures } from '../../assets/prefectures.json';

export const RegistUserInfoScreen = ({ navigation }) => {
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
  const prefectureItem = prefectures.map(({ name }) => {
    return <Select.Item label={name} key={name} value={name} />;
  });

  // 来店きっかけ選択リスト
  const hearFromItem = hearFromList.map((item) => {
    return (
      <Radio value={item} key={item} mr="2">
        {item}
      </Radio>
    );
  });

  // 希望レート選択リスト
  const hopeRateItem = hopeRateList.map((item) => {
    return (
      <Radio value={item} key={item} mr="2">
        {item}
      </Radio>
    );
  });

  const formatBirthDate = (val: string) => {
    if (val.length <= 4) {
      setBirthDate(val);
    } else {
      setBirthDate(val);
    }
  };

  const regist = async () => {
    // const formItem = {
    //   familyName,
    //   firstName,
    //   birthDate,
    //   addressPrefecture: address.prefecture,
    //   addressCity: address.city,
    //   hearFrom,
    //   introduced: hearFrom === '紹介' ? introduced : null,
    //   phoneNumber: phoneNum,
    //   hopeRate,
    // };
    const formItem = {
      family_name: familyName,
      first_name: firstName,
      nickname: familyName + ' ' + firstName,
      birth_date: birthDate,
      address_prefecture: address.prefecture,
      address_city: address.city,
      hear_from: hearFrom,
      introduced: hearFrom === '紹介' ? introduced : null,
      phone_number: phoneNum,
      hope_rate: hopeRate,
    };
    console.log(formItem);
    const res = await requestHttpPost('/api/v1/user/profile/', formItem, true);
    console.log(res.result, res.data);
    if (res.result) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main', params: { userId: res.data.user } }],
        })
      );
    }
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
            <Text style={styles.invalidText}>
              メールアドレスまたはパスワードが正しくありません
            </Text>
          ) : null}
          <View style={styles.nameContainer}>
            <Text style={styles.label}>お名前</Text>
            <View style={styles.nameInputContainer}>
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
            </View>
          </View>
          <View style={styles.birthContainer}>
            <Text>生年月日</Text>
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={(text) => formatBirthDate(text)}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              placeholder="YYYY/MM/DD"
            />
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.label}>お住まい</Text>
            <Stack direction={{ base: 'row' }}>
              <Select
                selectedValue={address.prefecture}
                minWidth="100"
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
                placeholder="名"
              />
            </Stack>
          </View>
          <Stack my="4">
            <NBText fontSize="md" mb="2">
              ご来店のきっかけ
            </NBText>
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
            <View style={styles.introducedContainer}>
              <Text style={styles.label}>ご紹介者様</Text>
              <TextInput
                style={styles.input}
                value={introduced}
                onChangeText={(text) => setIntroduced(text)}
                textContentType="emailAddress"
                placeholder="麻雀太郎"
              />
            </View>
          ) : null}

          <View style={styles.phoneContainer}>
            <Text style={styles.label}>お電話番号</Text>
            <TextInput
              style={styles.input}
              value={phoneNum}
              onChangeText={(text) => setPhoneNum(text)}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              placeholder="09012345678"
            />
          </View>
          <Stack my="4">
            <NBText fontSize="md" mb="2">
              ご希望レート
            </NBText>
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
          <Button onPress={regist} bg="#00EB7D" _text={{ color: '#fff' }}>
            登録
          </Button>
          <Link
            alignSelf="flex-end"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })
            }
          >
            ログイン画面へ戻る
          </Link>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  nameContainer: {},
  nameInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  birthContainer: {},
  addressContainer: {},
  hearFromContainer: {},
  introducedContainer: {},
  phoneContainer: {},
  rateContainer: {},
  label: {
    marginBottom: 4,
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
  btn: {
    backgroundColor: '#10B981',
    height: 48,
    lineHeight: 32,
    borderRadius: 48,
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  invalidText: {
    color: 'red',
    marginBottom: 8,
  },
});
