import { useState } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { View, Button, Text, Input, Link } from 'native-base'
import { createAccount } from '../scripts/requestAuth'

const ERR_MSG = {
  empEmail: 'メールアドレスを入力してください',
  empPW: 'パスワードを入力してください',
  empConfirmPW: 'パスワード(確認用)を入力してください',
  sameEmail: '既にこのメールアドレスは使われています',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  pwTooShort: '8文字以上の半角英数字で設定してください',
  pwNoMatch: 'パスワードとパスワード(確認用)が一致しません',
}

export const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [validation, setValidation] = useState({
    valid: false,
    msg: '',
  })
  const [isSigningUp, setIsSigningUp] = useState(false)

  const ValidCheckForConfirm = (): boolean => {
    // 未入力チェック
    if (email === '') {
      setValidation({ valid: true, msg: ERR_MSG.empEmail })
      return false
    } else if (password === '') {
      setValidation({ valid: true, msg: ERR_MSG.empPW })
      return false
    } else if (confirmPw === '') {
      setValidation({ valid: true, msg: ERR_MSG.empConfirmPW })
      return false
    }

    // メールアドレスの形式チェック
    const regex =
      /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      setValidation({ valid: true, msg: ERR_MSG.invalidEmail })
      return false
    }

    // パスワード一致チェック
    if (password !== confirmPw) {
      setValidation({ valid: true, msg: ERR_MSG.pwNoMatch })
      return false
    }

    return true
  }

  const signUp = async () => {
    setIsSigningUp(true)
    const isValid = ValidCheckForConfirm()
    if (isValid) {
      const res = await createAccount({ email, password })
      if (res) {
        navigation.reset({ index: 0, routes: [{ name: 'RegistUserInfo' }] })
      } else {
        setValidation({ valid: true, msg: ERR_MSG.sameEmail })
      }
    }
    setIsSigningUp(false)
  }

  const onChangePw = (value: string) => {
    const regex = /^[0-9a-zA-Z]*$/
    // パスワード文字数&半角英数字チェック
    if (!regex.test(value) || password.length < 8) {
      setValidation({ valid: true, msg: ERR_MSG.pwTooShort })
    } else {
      setValidation({ valid: false, msg: '' })
    }
    setPassword(value)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View px={6}>
          {validation.valid ? (
            <Text color="red.500" mb={2}>
              {validation.msg}
            </Text>
          ) : null}
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            py={3}
            mb={4}
            fontSize={16}
            bg="white"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="メールアドレス"
          />
          <Input
            value={password}
            onChangeText={(text) => onChangePw(text)}
            py={3}
            mb={4}
            fontSize={16}
            bg="white"
            autoCapitalize="none"
            textContentType="password"
            placeholder="パスワード"
            secureTextEntry
          />
          <Input
            value={confirmPw}
            onChangeText={(text) => setConfirmPw(text)}
            py={3}
            mb={4}
            fontSize={16}
            bg="white"
            autoCapitalize="none"
            textContentType="password"
            placeholder="パスワード(確認用)"
            secureTextEntry
          />
          <Button
            isLoading={isSigningUp}
            _loading={{
              bg: 'green.500:alpha.90',
            }}
            onPress={signUp}
            my={2}
            py={2}
            bg="green.400"
            _pressed={{ backgroundColor: 'green.500' }}
            _text={{ color: '#fff', fontSize: 16 }}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
