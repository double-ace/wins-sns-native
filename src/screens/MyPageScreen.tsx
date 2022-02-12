import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import {
  Link,
  Avatar,
  Button,
  Text,
  Stack,
  Box,
  Pressable,
  Switch,
  Spacer,
  HStack,
} from 'native-base';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { postData } from '../../assets/postData.json';
import { delData } from '../scripts/asyncStore';
import { requestHttpGet } from '../scripts/requestBase';

type PostData = {
  id: string;
  poster: string;
  date: Date | string;
  content: string;
};

const posts: PostData[] = postData;

export const MyPageScreen = ({ navigation }) => {
  const logout = async () => {
    try {
      await delData('access');
      navigation.navigate('SignIn');
    } catch (e) {
      console.log('logoutError========');
      console.log(e);
    }
  };

  const getMyProfile = async () => {
    // ユーザ名とプロフ画像取得
    const proRes = await requestHttpGet('/api/v1/user/profile');
    // 友達一覧取得
    const friendRes = await requestHttpGet('');
  };

  const renderItem = ({ item }) => {
    return (
      <Box
        bg="white"
        px={2}
        py={2}
        borderBottomWidth={1}
        borderColor="blueGray.200"
      >
        <HStack alignItems="center">
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
          <Box ml={2}>
            <Text fontSize={16}>{item.poster}</Text>
            <Text color="blueGray.500">来店時間{item.date}</Text>
          </Box>
          <Spacer />
          <Box mr="2">
            <Text color="blueGray.600">通知送信</Text>
            <Switch size="sm" />
          </Box>
          <Box>
            <Text color="blueGray.600">通知受取</Text>
            <Switch size="sm" />
          </Box>
          <Spacer />
          <Box position="absolute" right={0}>
            <AntDesign
              name="delete"
              size={24}
              color="red"
              onPress={() => alert('削除しますか？')}
            />
          </Box>
        </HStack>
      </Box>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box p={2} position="relative">
        <Pressable
          position="absolute"
          right="2"
          top="2"
          ml="4"
          onPress={() => alert('settings')}
        >
          <Ionicons name="settings" size={28} color="gray" />
        </Pressable>
        <HStack alignItems="center" mb={2}>
          <Link position="relative" onPress={() => alert('Works!')}>
            <Avatar size="xl"></Avatar>
            <Box position="absolute" bottom="1" right="0">
              <Feather name="edit" size={18} color="gray" />
            </Box>
          </Link>
          <Box ml={2}>
            <Stack flexDirection="row" alignItems="center">
              <Box>
                <Text fontSize="3xl">
                  my name
                  <Feather name="edit" size={15} color="gray" />
                </Text>
              </Box>
            </Stack>
            <Box flexDirection="row" justifyContent="space-between">
              <Pressable
                alignItems="center"
                onPress={() => navigation.navigate('friend')}
              >
                <Text>友達</Text>
                <Text>10</Text>
              </Pressable>
              <Button variant="outline" px="8" ml="4">
                来店通知をOFF
              </Button>
            </Box>
          </Box>
        </HStack>
        <View>
          <Button onPress={() => navigation.navigate('PointManage')}>
            ポイント管理
          </Button>
          <Button onPress={logout}>ログアウト</Button>
        </View>
      </Box>
      <View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
        />
      </View>
    </SafeAreaView>
  );
};
