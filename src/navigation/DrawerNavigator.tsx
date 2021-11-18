import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerRender } from '../screens/CustomDrawer';
import { MainTabNavigator } from './MainTabNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Drawer"
      drawerContent={CustomDrawerRender}
    >
      <Drawer.Screen name="Tab" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
};
