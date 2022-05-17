import { useState } from 'react';
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
import { createAccount } from '../scripts/requestAuth';

const ERR_MSG = {
  empEmail: 'メールアドレスを入力してください',
  empPW: 'パスワードを入力してください',
  empConfirmPW: 'パスワード(確認用)を入力してください',
  sameEmail: '既にこのメールアドレスは使われています',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  pwTooShort: '8文字以上の半角英数字で設定してください',
  pwNoMatch: 'パスワードとパスワード(確認用)が一致しません',
};

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [validation, setValidation] = useState({
    valid: false,
    msg: '',
  });

  const signUp = async () => {
    // 入力チェック
    if (email === '') {
      setValidation({ valid: true, msg: ERR_MSG.empEmail });
      return;
    } else if (password === '') {
      setValidation({ valid: true, msg: ERR_MSG.empPW });
      return;
    } else if (confirmPw === '') {
      setValidation({ valid: true, msg: ERR_MSG.empConfirmPW });
      return;
    }

    // メールアドレスの形式チェック
    const regex =
      /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setValidation({ valid: true, msg: ERR_MSG.invalidEmail });
      return;
    }

    // パスワード一致チェック
    if (password !== confirmPw) {
      setValidation({ valid: true, msg: ERR_MSG.pwNoMatch });
      return;
    }

    const res = await createAccount({ email, password });
    if (res) {
      navigation.reset({ index: 0, routes: [{ name: 'RegistUserInfo' }] });
    } else {
      setValidation({ valid: true, msg: ERR_MSG.sameEmail });
    }
  };

  const onChangePw = (value: string) => {
    const regex = /^[0-9a-zA-Z]*$/;
    // パスワード文字数&半角英数字チェック
    if (!regex.test(value) || password.length < 8) {
      setValidation({ valid: true, msg: ERR_MSG.pwTooShort });
    } else {
      setValidation({ valid: false, msg: '' });
    }
    setPassword(value);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          {validation.valid ? (
            <Text style={styles.invalidText}>{validation.msg}</Text>
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
            onChangeText={(text) => onChangePw(text)}
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
            _text={{ color: 'primary.600' }}
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
