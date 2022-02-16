import React, { useEffect, useState } from 'react';
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
import { FontAwesome } from '@expo/vector-icons';
import { requestHttpGet, requestHttpPost } from '../scripts/requestBase';
import { getData } from '../scripts/asyncStore';

type ChatMessage = {
  id: string;
  content: string;
  sendFrom: string;
  sendTo: string;
  date: string;
};

type Id = string | null;

export const ChatScreen = () => {
  const [content, setContent] = useState('');
  const [dmList, setDmList] = useState<any[]>([]);
  // let userId: Id = null;
  const [userId, setUserId] = useState<Id>(null);
  let shopId: Id = null;

  const getUserId = async () => {
    // userId = await getData('userId');
    setUserId(await getData('userId'));
    console.log('getUser: ', userId);
  };

  const getDm = async () => {
    !userId && (await getUserId());
    const res = await requestHttpGet('/api/v1/sns/dm/');
    console.log(userId, res);
    if (userId && res.result) {
      setDmList(
        res.data.map((item) => {
          return {
            id: item.id,
            content: item.content,
            sendFrom: item.send_from,
            sendTo: item.send_to,
            date: item.created_at,
          };
        })
      );
    }
  };

  const sendDm = async (content: string) => {
    const param = {
      content,
      send_to: '',
    };
    const res = await requestHttpPost('/api/v1/sns/dm/', param, true);
  };

  useEffect(() => {
    getDm();
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<ChatMessage>) => {
    console.log(userId);
    return item.sendFrom !== userId ? (
      <View style={styles.messageContainerFromShop} key={item.id}>
        <Avatar size="sm" />
        <View style={styles.msAndDateFromShop}>
          <View style={styles.messageFromShop}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.messageContainer} key={item.id}>
        <View style={styles.msAndDate}>
          <View style={styles.message}>
            <Text style={styles.messageText}>{item.content}</Text>
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
      <SafeAreaView style={{ flex: 1 }}>
        <Box px={2} pt={6}>
          <FlatList
            data={dmList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled
          />
        </Box>
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
