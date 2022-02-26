import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button, Link } from 'native-base';
import { authLogin } from '../scripts/requestAuth';
import { setData, getData } from '../scripts/asyncStore';
import { createAccount } from '../scripts/requestAuth';

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [validList, setValidList] = useState({
    common: {
      value: 'アカウント登録に失敗しました',
      isValid: false,
    },
    sendEmail: {
      value: '既にこのメールアドレスは使われています',
      isValid: false,
    },
    inputEmail: {
      value: 'メールの形式が正しくありません',
      isValid: false,
    },
    password: {
      value: '8文字以上の半角英数字で設定してください',
      isValid: false,
    },
    confirmPw: {
      value: 'パスワードとパスワード(確認用)が一致しません',
      isValid: false,
    },
  });

  const signUp = async () => {
    if (password === confirmPw) {
      const param = { email, password };
      try {
        const res = await createAccount({ email, password });
        if (res) {
          navigation.reset({ index: 0, routes: [{ name: 'RegistUserInfo' }] });
        } else {
          const clone = Object.assign({}, validList);
          clone.common.isValid = true;
          setValidList({ ...clone });
        }
      } catch (e) {
        const clone = Object.assign({}, validList);
        clone.common.isValid = true;
        setValidList({ ...clone });
        alert(e);
      }
    } else {
    }

    // 開発用
    console.log('error');
    // navigation.navigate('Main');
    navigation.navigate('RegistUserInfo');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          {validList.common.isValid ? (
            <Text style={styles.invalidText}>
              メールアドレスまたはパスワードが正しくありません
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="メールアドレス"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            textContentType="password"
            placeholder="パスワード"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            value={confirmPw}
            onChangeText={(text) => setConfirmPw(text)}
            autoCapitalize="none"
            textContentType="password"
            placeholder="パスワード(確認用)"
            secureTextEntry
          />
          <Button
            onPress={signUp}
            my="2"
            bg="green.400"
            _pressed={{ backgroundColor: 'green.500' }}
            _text={{ color: '#fff' }}
          >
            アカウント作成
          </Button>
          <Link
            alignSelf="flex-end"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              })
            }
          >
            アカウント作成済の方
          </Link>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
