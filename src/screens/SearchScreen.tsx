import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import {
  Link,
  Avatar,
  Button,
  Input,
  Box,
  HStack,
  Spacer,
  Center,
} from 'native-base';
import { getData } from '../scripts/asyncStore';
import { requestHttpGet, requestHttpPost } from '../scripts/requestBase';
import { SkeletonItem } from '../components/SkeletonUserItem';

type UserList = {
  id: string;
  nickname: string;
  imageUrl: string;
};

export const SearchScreen = ({ navigation }) => {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getUserList();
  }, []);

  // ユーザ取得
  const getUserList = async () => {
    const res = await requestHttpGet('/api/v1/sns/users/');
    setUserList(res.data);
  };

  const onChangeKeyword = async (keyword: string) => {
    setIsSearching(true);
    // 入力値でユーザをフィルター
    console.log('keyword: ', keyword);
    if (keyword) {
      const res = await requestHttpGet(`/api/v1/sns/users/?keyword=${keyword}`);
      setUserList(res.data);
    }
    setIsSearching(false);
  };

  // 友達申請
  const handleReq = async (id: string) => {
    // const res = await requestHttpPost
    const param = {
      req_to: id,
    };
    const res = await requestHttpPost(
      '/api/v1/sns/friend-request/',
      param,
      true
    );
    setUserList((pre) => [
      ...pre.filter((item) => item.id !== res.data.req_to),
    ]);
  };

  const renderItem = ({ item }: ListRenderItemInfo<UserList>) => {
    return (
      <Box py="3" style={styles.postContainer} key={item.id}>
        <HStack alignItems="center">
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
          <View style={styles.postHeaderTxtContainer}>
            <Text style={styles.posterName}>{item.nickname}</Text>
          </View>
          <Spacer />
          <Button
            px="6"
            h="10"
            bg="emerald.400"
            _text={{ fontWeight: 'bold' }}
            onPress={() => handleReq(item.id)}
          >
            友達申請
          </Button>
        </HStack>
      </Box>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        variant="rounded"
        mb="2"
        mx="1"
        placeholder="ユーザ名入力"
        onChangeText={(value) => onChangeKeyword(value)}
      />
      {isSearching ? (
        <SkeletonItem />
      ) : !userList.length ? (
        <Center>一致するユーザが見つかりません</Center>
      ) : (
        <FlatList data={userList} renderItem={renderItem} scrollEnabled />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFB',
    paddingVertical: 8,
  },
  postContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },
  avatar: {
    backgroundColor: '#cccccc',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
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
  postDate: {
    color: '#A8A8A8',
  },
  fab: {},
});
