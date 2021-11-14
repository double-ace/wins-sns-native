import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { DrawerNavigator } from './DrawerNavigator';

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="SignIn" component={SignInScreen} />
        <RootStack.Screen name="Home" component={DrawerNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
