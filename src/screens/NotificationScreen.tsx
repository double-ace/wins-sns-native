import { HStack, Spacer, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { postData } from '../../assets/postData.json';

type PointHistory = {
  id: string | number;
  point: string;
  content: string;
  date: Date | string;
};

export const NotificationScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <HStack
        justifyContent="space-between"
        px="2"
        py="6"
        bg="white"
        borderBottomWidth={1}
        borderColor="blueGray.200"
        key={item.id}
      >
        <Text mr={2} color="blueGray.600">
          {item.date_time}
        </Text>
        <Text>{item.name}から友達申請がきました</Text>
        <Spacer />
      </HStack>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList data={postData} renderItem={renderItem} scrollEnabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
