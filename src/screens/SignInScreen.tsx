import React, { useEffect, useState } from 'react'
import { CommonActions } from '@react-navigation/native'
import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { View, Button, Text, Input, Link } from 'native-base'
import { Loading } from '../components/Loading'
import { authLogin, delToken } from '../scripts/requestAuth'
import { setData, getData } from '../scripts/asyncStore'
import { requestHttpGet } from '../scripts/requestBase'

export const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    initApp()
  }, [])

  const initApp = async () => {
    const access = await getData('access')
    if (access) {
      await checkProfile()
    } else {
      setIsLoading(false)
    }
  }

  const signIn = async () => {
    setIsSigningIn(true)
    const res = await authLogin({ email, password })
    if (res.result) {
      await checkProfile()
    } else {
      setInvalid(true)
    }
    setIsSigningIn(false)
  }

  const checkProfile = async () => {
    const res = await requestHttpGet('/api/v1/user/profile/')
    if (res.result) {
      // プロフィール情報が取得できた場合はメイン画面へ、取得できない場合はユーザ情報登録画面へ遷移
      if (res.data.length) {
        await setData('userId', res.data[0].user)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Main', params: { userId: res.data[0].user } }],
          })
        )
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'RegistUserInfo' }] })
      }
    } else {
      await delToken()
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            <View px={6}>
              {invalid ? (
                <Text color="red.500" mb={2}>
                  メールアドレスまたはパスワードが正しくありません
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
                onChangeText={(text) => setPassword(text)}
                py={3}
                mb={4}
                fontSize={16}
                bg="white"
                autoCapitalize="none"
                textContentType="password"
                placeholder="パスワード"
                secureTextEntry
              />
              <Button
                isLoading={isSigningIn}
                _loading={{
                  bg: 'green.500:alpha.90',
                }}
                onPress={signIn}
                my={2}
                py={2}
                bg="green.400"
                _pressed={{ backgroundColor: 'green.500' }}
                _text={{ color: '#fff', fontSize: 16 }}
              >
                ログイン
              </Button>
              <Link
                alignSelf="flex-end"
                _text={{ color: 'primary.600' }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignUp' }],
                  })
                }
              >
                アカウントをお持ちでない方
              </Link>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
