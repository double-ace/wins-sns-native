import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { chatMessage } from '../../assets/chatMessage.json';

type ChatMessage = {
  message: string;
  sendFrom: string;
  date: string;
};

export const ChatScreen = () => {
  const messages: ChatMessage[] = chatMessage;

  const renderItem = ({ item }: ListRenderItemInfo<ChatMessage>) => {
    // 日付の整形

    // 秒以下は省略

    // 当日の場合は時刻のみ表示

    // 今年の場合は年を月以下を表示

    return item.sendFrom === 'wins' ? (
      <View style={styles.messageContainerFromShop}>
        <Avatar
          size="small"
          rounded
          avatarStyle={styles.avatar}
          icon={{ name: 'home' }}
          activeOpacity={0.7}
        />
        <View style={styles.msAndDateFromShop}>
          <View style={styles.messageFromShop}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.messageContainer}>
        <View style={styles.msAndDate}>
          <View style={styles.message}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
        <Avatar
          size="small"
          rounded
          avatarStyle={styles.avatar}
          icon={{ name: 'home' }}
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
    maxWidth: 240,
  },
  messageFromShop: {
    backgroundColor: '#D1D5DB',
    padding: 8,
    borderRadius: 4,
    maxWidth: 240,
  },
  messageText: {},
  msAndDate: {
    marginRight: 4,
  },
  msAndDateFromShop: {
    marginLeft: 4,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateText: {
    color: '#6B7280',
  },
});
