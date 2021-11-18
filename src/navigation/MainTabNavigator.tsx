import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { MediaScreen } from '../screens/MediaScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { PointManageScreen } from '../screens/PointManageScreen';
import { FollowScreen } from '../screens/FollowScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const MyPageStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
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
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'チャット',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={size} color={color} />
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
