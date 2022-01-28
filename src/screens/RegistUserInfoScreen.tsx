import axios from 'axios';
import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import { authLogin } from '../scripts/requestAuth';
import { setData, getData } from '../scripts/asyncStore';

export const RegistUserInfoScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState({ year: 2000, month: 1, date: 1 });
  const [address, setAdress] = useState({ prefecture: '', city: '' });
  const [hearFrom, setHearFrom] = useState('');
  const [introduced, setIntroduced] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const hearFromList = [
    {
      label: '麻雀王国',
      value: 'mahjongKingdom',
    },
    {
      label: 'Twitter',
      value: 'twitter',
    },
    {
      label: '看板',
      value: 'signboard',
    },
    {
      label: '紹介',
      value: 'introduced',
    },
    {
      label: 'その他',
      value: 'others',
    },
  ];

  const login = async () => {
    const param = { email, password };
    try {
      const res = await authLogin({ email, password });
      if (res) {
        invalid === false ? setInvalid(false) : null;
        navigation.navigate('Main');
      } else {
        setInvalid(true);
      }
    } catch (e) {
      setInvalid(true);
      alert(e);
    }
    // 開発用
    console.log('error');
    navigation.navigate('Main');
  };

  const now = new Date();
  const yearList: number[] = [];
  for (let i = 1902; i <= now.getFullYear(); i++) {
    yearList.push(i);
  }
  const pickerYearItem = yearList.map((year) => {
    return <Picker.Item label={year.toString()} value={year} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              textContentType="familyName"
              placeholder="姓"
            />
            <TextInput
              style={[styles.input, styles.nameInput]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              textContentType="givenName"
              placeholder="名"
            />
          </View>
        </View>
        <View style={styles.birthContainer}>
          <Text>生年月日</Text>
          <Picker
            selectedValue={birth.year}
            onValueChange={(value) =>
              setBirth((pre) => ({ ...pre, year: value }))
            }
          >
            {pickerYearItem}
          </Picker>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.label}>お住まい</Text>
        </View>
        <View style={styles.hearFromContainer}>
          <Text style={styles.label}>ご来店のきっかけ</Text>
        </View>
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
        <Button
          title="登録"
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
          onPress={login}
        />
      </View>
    </SafeAreaView>
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
