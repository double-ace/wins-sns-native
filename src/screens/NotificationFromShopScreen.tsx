import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

export const NotificationFromShopScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Notification Screen From Shop</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
