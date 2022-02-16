import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TextInput,
  ListRenderItemInfo,
  Platform,
  Keyboard,
} from 'react-native';
import {
  Avatar,
  Box,
  HStack,
  KeyboardAvoidingView,
  Pressable,
} from 'native-base';
import { chatMessage } from '../../assets/chatMessage.json';
import { FontAwesome } from '@expo/vector-icons';

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
        <Avatar size="sm" />
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
        <Avatar size="sm" />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      h={{ base: '765px', lg: 'auto' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: 12 }}>
        <View style={styles.container}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled
          />
        </View>
        <HStack
          style={styles.inputContainer}
          px={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <TextInput
            multiline
            numberOfLines={1}
            value={content}
            onChangeText={(value) => setContent(value)}
            editable
            style={styles.textBox}
            maxLength={150}
          />
          <Pressable onPress={() => Keyboard.dismiss()}>
            <Box>
              <FontAwesome name="send" size={24} color="blue" />
            </Box>
          </Pressable>
        </HStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
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
    backgroundColor: '#00EF80',
    padding: 8,
    borderRadius: 4,
    maxWidth: 240,
  },
  messageFromShop: {
    backgroundColor: '#fff',
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
    paddingHorizontal: 4,
    paddingVertical: 4,
    bottom: 0,
    width: '100%',
    minHeight: 40,
    maxHeight: 80,
    backgroundColor: '#00EF80',
  },
  textBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 8,
    width: '91%',
  },
});
