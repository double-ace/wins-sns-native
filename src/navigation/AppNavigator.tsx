import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackScreen } from './HomeStackNavigator'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['NativeBase:'])

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  )
}
