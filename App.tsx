import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  // return <SignInScreen />;
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
