import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Link, Avatar, Button, Text, Stack, Box, Pressable, Switch, Flex, Spacer, HStack } from 'native-base';
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
      console.log('logoutError========')
      console.log(e);
    }
  };

  const getMyProfile = async () => {
    // ユーザ名とプロフ画像取得
    const proRes = await requestHttpGet('/api/v1/user/profile')
    // 友達一覧取得
    const friendRes = await requestHttpGet('')
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <HStack alignItems="center">
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
          <View style={styles.postHeaderTxtContainer}>
            <Text style={styles.posterName}>{item.poster}</Text>
            <Text color="blueGray.500">来店時間{item.date}</Text>
          </View>
          <Spacer />
          <Box mr="2">
            <Text color="blueGray.600">通知送信</Text>
            <Switch size="sm"  />
          </Box>
          <Box>
            <Text color="blueGray.600">通知受取</Text>
            <Switch size="sm" />
          </Box>
          <Spacer />
          <View style={styles.dustBox}>
            <AntDesign
              name="delete"
              size={24}
              color="red"
              onPress={() => alert('削除しますか？')}
            />
          </View>
        </HStack>
      </View>
    );
  };
  return (
    <Box style={styles.container} bg="primary.100">
      <Box position="relative" style={styles.topContainer}>
        <Pressable position="absolute" right="2" top="2" ml="4" onPress={() => alert('settings')}>
          <Ionicons name="settings" size={28} color="gray" />
        </Pressable>
        <View style={styles.userInfoContainer}>
          <Link position="relative"  onPress={() => alert('Works!')}>
            <Avatar size="xl"></Avatar>
            <Box position="absolute" bottom="1" right="0">
              <Feather name="edit" size={18} color="gray" />
            </Box>
          </Link>
          <View style={styles.userInfoRightContainer}>
            <Stack flexDirection="row" alignItems="center">
              <Box>
                <Text fontSize="3xl">my name<Feather name="edit" size={15} color="gray" /></Text>
              </Box>

            </Stack>
            <Box flexDirection="row" justifyContent="space-between">
              <TouchableOpacity
                style={styles.follow}
                onPress={() => navigation.navigate('friend')}
              >
                <Text>友達</Text>
                <Text>10</Text>
              </TouchableOpacity>
              <Button variant="outline" px="8" ml="4">来店通知をOFF</Button>
            </Box>
          </View>
        </View>
        <View>
          {/* <Button onPress={() => navigation.navigate('PointManage')}> */}
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
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  topContainer: {
    padding: 12,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfoRightContainer: {
    marginLeft: 14,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  follow: {
    alignItems: 'center',
  },
  follower: {},
  avatar: {
    backgroundColor: '#cccccc',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pointManageBtn: {
    borderRadius: 40,
    paddingVertical: 12,
    backgroundColor: '#00EF80',
    marginBottom: 8,
  },
  logoutTitle: {
    color: '#FF1A1A',
  },
  logoutBtn: {
    borderRadius: 40,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderColor: '#FF1A1A',
    borderWidth: 1,
  },
  postContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderTxtContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 8,
  },
  postContent: {},
  posterName: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  dustBox: {
    position: 'absolute',
    right: 0,
  },
});
