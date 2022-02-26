import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  ListRenderItemInfo,
  Platform,
  Keyboard,
  GestureResponderEvent,
} from 'react-native';
import {
  FlatList,
  Avatar,
  Box,
  Stack,
  HStack,
  Center,
  KeyboardAvoidingView,
  Pressable,
  Text,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { requestHttpGet, requestHttpPost } from '../scripts/requestBase';
import { getData } from '../scripts/asyncStore';

type Id = string | null;
type Dm = {
  id: string;
  content: string;
  sendFrom: string;
  sendTo: string;
  date: string;
};

export const ChatScreen = () => {
  const [content, setContent] = useState('');
  const [dmList, setDmList] = useState<any[]>([]);
  const [userId, setUserId] = useState<Id>(null);

  const getUserId = async () => {
    const id = await getData('userId');
    console.log('id', id);
    setUserId(id);
    console.log('getUser: ', userId);
  };

  const getDm = async () => {
    !userId && (await getUserId());
    const res = await requestHttpGet('/api/v1/sns/dm/');
    console.log(userId, res);
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
  };

  const sendDm = async (e: GestureResponderEvent) => {
    const param = {
      content,
      send_to: 'aab52573-f435-47d4-ada1-daa89a9705bf',
    };
    const res = await requestHttpPost('/api/v1/sns/dm/', param, true);
    // setDmList((pre) => [...pre, res.data]);
    await getDm();
    setContent('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    getDm();
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<Dm>) => {
    console.log('userId', userId);
    return item.sendFrom !== userId ? (
      <HStack mb={4} key={item.id}>
        <Avatar size="sm" bg="gray.300" />
        <Stack ml={1} alignItems="flex-start">
          <Box
            bg="blueGray.200"
            p={2}
            borderRadius={4}
            maxWidth={240}
            _text={{ fontSize: 'sm', color: 'black' }}
          >
            {item.content}
          </Box>
          <Text color="blueGray.500">
            {format(new Date(item.date), 'yyyy/MM/dd HH:mm')}
          </Text>
        </Stack>
      </HStack>
    ) : (
      <HStack justifyContent="flex-end" mb={4} key={item.id}>
        <Stack mr={1} alignItems="flex-end">
          <Box
            bg="tertiary.300"
            p={2}
            borderRadius={4}
            maxWidth={240}
            _text={{ fontSize: 'sm', color: 'black' }}
          >
            {item.content}
          </Box>
          <HStack justifyContent="flex-end">
            <Text color="blueGray.500">
              {format(new Date(item.date), 'yyyy/MM/dd HH:mm')}
            </Text>
          </HStack>
        </Stack>
        <Avatar size="sm" bg="gray.300" />
      </HStack>
    );
  };

  return (
    <KeyboardAvoidingView
      h={{ base: '745px', lg: 'auto' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {!userId || !dmList.length ? (
          <Center>お店とチャットができます。</Center>
        ) : (
          <Box px={2} pt={6}>
            <FlatList data={dmList} renderItem={renderItem} scrollEnabled />
          </Box>
        )}
        <HStack
          position="absolute"
          bottom={0}
          p={2}
          w="100%"
          minHeight={10}
          maxHeight={80}
          bg="blueGray.200"
          borderTopWidth={1}
          borderColor="blueGray.300"
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
          <Pressable onPress={(e) => content && sendDm(e)}>
            <Box>
              <Ionicons
                name="send"
                size={24}
                color={content ? '#34d399' : '#9ca3af'}
              />
            </Box>
          </Pressable>
        </HStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 8,
    width: '91%',
  },
});
