import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

export const FollowScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Follow Screen</Text>
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
