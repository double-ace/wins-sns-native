import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { HomeScreen } from '../screens/HomeScreen'
import { NotificationScreen } from '../screens/NotificationScreen'
import { NotificationFromShopScreen } from '../screens/NotificationFromShopScreen'
import { SearchScreen } from '../screens/SearchScreen'
import { ChatScreen } from '../screens/ChatScreen'
import { FriendRequestScreen } from '../screens/FriendRequestScreen'
import { MyPageScreen } from '../screens/MyPageScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { FriendsScreen } from '../screens/FriendsScreen'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { HeaderIcon } from '../components/HeaderIcon'
import { Image, Box } from 'native-base'

type HomeStackParamList = {
  Home: undefined
  Notification: undefined
  NotificationFromShop: undefined
}
type HomeScreenProp = StackNavigationProp<HomeStackParamList, 'Home'>

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const MyPageStack = createStackNavigator()

const HomeStackScreen = () => {
  const LogoTitle = () => {
    return (
      <Box>
        <Image
          source={require('../../assets/header-logo.png')}
          alt="header-logo"
          w={146}
          h={6}
        />
      </Box>
    )
  }
  const navigation = useNavigation<HomeScreenProp>()
  return (
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={{ headerBackTitleVisible: false }}>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerTitle: () => <LogoTitle />,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4ade80',
            },
            headerRight: () => <HeaderIcon navigation={navigation} />,
          }}
        />
        <HomeStack.Screen
          name="NotificationFromShop"
          component={NotificationScreen}
          options={{
            title: '通知一覧',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4ade80',
            },
          }}
        />
        <HomeStack.Screen
          name="Notification"
          component={NotificationFromShopScreen}
          options={{
            title: '店舗からのお知らせ',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4ade80',
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

const MyPageStackScreen = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Group screenOptions={{ headerBackTitleVisible: false }}>
        <MyPageStack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ headerShown: false }}
        />
        <MyPageStack.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            title: '友達一覧',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#4ade80',
            },
          }}
        />
      </MyPageStack.Group>
      <MyPageStack.Group
        screenOptions={{ presentation: 'modal', headerBackTitleVisible: false }}
      >
        <MyPageStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: '設定',
            headerTintColor: '#404040',
          }}
        />
      </MyPageStack.Group>
    </MyPageStack.Navigator>
  )
}

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#4ade80' }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'ホーム',
          title: 'ホーム',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: '検索',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarLabel: '店舗DM',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FriendRequest"
        component={FriendRequestScreen}
        options={{
          headerShown: false,
          tabBarLabel: '申請一覧',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPageStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'マイページ',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
