import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

export const DMScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>DM Screen</Text>
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
