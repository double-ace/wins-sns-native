import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MainTabNavigator } from './MainTabNavigator';

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="SignIn" component={SignInScreen} />
        <RootStack.Screen name="Home" component={MainTabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
