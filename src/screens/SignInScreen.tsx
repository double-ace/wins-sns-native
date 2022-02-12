import React, { useEffect, useState } from 'react';
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
import { Loading } from '../components/Loading';
import { authLogin } from '../scripts/requestAuth';
import { setData, getData, delData } from '../scripts/asyncStore';
import { requestHttpGet } from '../scripts/requestBase';

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      initApp();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    return console.log('endSignIn');
  }, []);

  const initApp = async () => {
    console.log('=============================');
    const access = await getData('access');
    if (access) {
      await checkProfile();
    } else {
      console.log('access: ', access);
      setIsLoading(false);
    }
  };

  const login = async () => {
    const param = { email, password };
    try {
      const res = await authLogin({ email, password });
      if (res) {
        await checkProfile();
      } else {
        console.log('responce is faild');
        setInvalid(true);
      }
    } catch (e) {
      setInvalid(true);
      alert(e);
    }
    // 開発用
    console.log('login error');
  };

  const checkProfile = async () => {
    const res = await requestHttpGet('/api/v1/user/profile/');
    if (res.result) {
      // プロフィール情報が取得できた場合はメイン画面へ、取得できない場合はユーザ情報登録画面へ遷移
      console.log('profile: ', res);
      res.data.length
        ? navigation.navigate('Main', { userId: res.data[0].user })
        : navigation.navigate('RegistUserInfo');
    }
    await delData('access');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
              {invalid ? (
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
              <Button
                onPress={login}
                my="2"
                bg="#00EB7D"
                _text={{ color: '#fff' }}
              >
                ログイン
              </Button>
              <Link
                alignSelf="flex-end"
                onPress={() => navigation.navigate('SignUp')}
              >
                アカウントをお持ちでない方
              </Link>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      )}
    </>
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
