import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>setting screen</Text>
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
