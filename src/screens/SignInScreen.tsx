import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { requestHttpPost } from '../scripts/requestBase';
import { setData, getData } from '../scripts/asyncStore';

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const param = { email, password };
    try {
      const res = await requestHttpPost('/api/v1/auth/jwt/create/', param);
      const ret = await setData('access', res.data.access);
      alert(res.data.access);
      // await setData('refresh', res.data.refresh);
      if (ret) {
        navigation.navigate('Home');
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
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
        <Button
          title="ログイン"
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
});
