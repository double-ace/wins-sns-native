import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          onPress={() => navigation.navigate('Home')}
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
