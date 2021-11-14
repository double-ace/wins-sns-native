import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerRender } from '../screens/CustomDrawer';
import { MainTabNavigator } from './MainTabNavigator';


const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={CustomDrawerRender}
    >
      <Drawer.Screen name="Home" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
};
