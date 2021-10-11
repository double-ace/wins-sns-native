import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { chatMessage } from '../../assets/chatMessage.json';

type ChatMessage = {
  message: string;
  sendFrom: string;
  date: string;
};

export const ChatScreen = () => {
  const messages: ChatMessage[] = chatMessage;

  const renderItem = ({ item }) => {
    return item.sendFrom === 'wins' ? (
      <View style={styles.messageContainerFromShop}>
        <Avatar
          size="small"
          rounded
          avatarStyle={styles.avatar}
          icon={{ name: 'home' }}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
        />
        <View style={styles.messageFromShop}>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.messageContainer}>
        <View style={styles.message}>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
        <Avatar
          size="small"
          rounded
          avatarStyle={styles.avatar}
          icon={{ name: 'home' }}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={messages} renderItem={renderItem} scrollEnabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  avatar: {
    backgroundColor: '#cccccc',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  messageContainerFromShop: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  message: {
    backgroundColor: '#34D399',
    padding: 8,
    borderRadius: 4,
    marginRight: 4,
    maxWidth: 240,
  },
  messageFromShop: {
    backgroundColor: '#D1D5DB',
    padding: 8,
    borderRadius: 4,
    marginLeft: 4,
    maxWidth: 240,
  },
  messageText: {},
});
