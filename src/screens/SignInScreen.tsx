import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { authLogin } from '../scripts/requestAuth';
import { setData, getData } from '../scripts/asyncStore';

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

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

  return (
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
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          textContentType="password"
          placeholder="Password"
          secureTextEntry
        />
        <Button onPress={login} bg="#00EB7D" _text={{ color: '#fff' }}>
          ログイン
        </Button>
      </View>
    </SafeAreaView>
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
