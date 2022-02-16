import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { NotificationFromShopScreen } from '../screens/NotificationFromShopScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { FriendRequestScreen } from '../screens/FriendRequestScreen';
import { MediaScreen } from '../screens/MediaScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { PointManageScreen } from '../screens/PointManageScreen';
import { FollowScreen } from '../screens/FollowScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HeaderIcon } from '../components/HeaderIcon';

type HomeStackParamList = {
  Home: undefined;
  Notification: undefined;
  NotificationFromShop: undefined;
};
type HomeScreenProp = StackNavigationProp<HomeStackParamList, 'Home'>;

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyPageStack = createStackNavigator();

const HomeStackScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
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
          }}
        />
      </HomeStack.Group>
      <HomeStack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <HomeStack.Screen name="PostCreateModal" component={CreatePostScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

const MyPageStackScreen = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Group screenOptions={{ headerShown: false }}>
        <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
        <MyPageStack.Screen name="PointManage" component={PointManageScreen} />
        <MyPageStack.Screen name="Follow" component={FollowScreen} />
      </MyPageStack.Group>
    </MyPageStack.Navigator>
  );
};

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
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
        name="Media"
        component={MediaScreen}
        options={{
          headerShown: false,
          tabBarLabel: "WIN'Sブログ",
          tabBarIcon: ({ size, color }) => (
            <Entypo name="folder-images" size={size} color={color} />
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
          tabBarLabel: '店舗チャット',
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
  );
};
