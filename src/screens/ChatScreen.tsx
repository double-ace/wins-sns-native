import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TextInput,
  ListRenderItemInfo,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { chatMessage } from '../../assets/chatMessage.json';

type ChatMessage = {
  id: string;
  message: string;
  sendFrom: string;
  date: string;
};

export const ChatScreen = () => {
  const messages: ChatMessage[] = chatMessage;
  const [content, setContent] = useState('');

  const renderItem = ({ item }: ListRenderItemInfo<ChatMessage>) => {
    return item.sendFrom === 'shop' ? (
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          numberOfLines={4}
          value={content}
          onChangeText={(value) => setContent(value)}
          editable
          style={styles.textBox}
          maxLength={150}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
    marginBottom: 40,
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
  inputContainer: {
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#10B981',
  },
  textBox: {
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingHorizontal: 8,
  },
});
