import React, { useEffect, useState } from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { SignInScreen } from '../screens/SignInScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { RegistUserInfoScreen } from '../screens/RegistUserInfoScreen'
import { MainTabNavigator } from './MainTabNavigator'
import { getData, setAccess } from '../scripts/asyncStore'
import { requestHttpGet } from '../scripts/requestBase'

const RootStack = createStackNavigator()

export const RootStackScreen = () => {
  // const [access, setAccess] = useState('');
  // const [profile, setProfile] = useState('');
  // useEffect(() => {
  //   const sample = async () => {
  //     console.log('test');
  //     const aa = await getData('access');
  //     const bb = await requestHttpGet('/api/v1/user/profile');
  //     aa && setAccess(aa);
  //     bb && setProfile(bb.data);
  //     console.log(profile);
  //   };

  //   sample();
  // }, []);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <RootStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <RootStack.Screen
          name="RegistUserInfo"
          component={RegistUserInfoScreen}
        />
        <RootStack.Screen name="Main" component={MainTabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}
