import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { DMScreen } from '../screens/DMScreen';
import { MediaScreen } from '../screens/MediaScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Media"
        component={MediaScreen}
        options={{
          tabBarLabel: 'MEDIA',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="folder-images" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DM"
        component={DMScreen}
        options={{
          tabBarLabel: 'DM',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'MyPage',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
