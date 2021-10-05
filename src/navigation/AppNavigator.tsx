import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './HomeStackNavigator';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
