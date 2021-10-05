import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

export const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyPage Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
