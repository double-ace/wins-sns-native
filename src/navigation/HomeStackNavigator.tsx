import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { SignInScreen } from '../screens/SignInScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { RegistUserInfoScreen } from '../screens/RegistUserInfoScreen'
import { MainTabNavigator } from './MainTabNavigator'

const RootStack = createStackNavigator()

export const RootStackScreen = () => {
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
