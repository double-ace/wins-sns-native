import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import { Link, Avatar, Button, Input, Box, HStack, Spacer } from 'native-base';
import { postData } from '../../assets/postData.json';
import { getData } from '../scripts/asyncStore';
import axios, { AxiosResponse } from 'axios';
import { requestHttpGet } from '../scripts/requestBase';

type PostData = {
  id: string | number;
  poster: string;
  date: Date | string;
  content: string;
};

const posts: PostData[] = postData;

export const SearchScreen = ({ navigation }) => {
  const [access, setAccess] = useState('');
  const [shop, setShop] = useState<string[]>([]);
  const [user, setUser] = useState([])

  useEffect(() => {
    // const sample = async () => {
    //   const aa = await getData('access');
    //   aa ? setAccess(aa) : null;
    // };
    // sample();
  });

  const getUsers = async () => {
    // ユーザ取得
    await requestHttpGet('/api/v1/user//')
  }

  const onChangeValue = (value) => {
    // 入力値でユーザをフィルター

  }

  const renderItem = ({ item }: ListRenderItemInfo<PostData>) => {
    return (
      <Box py="3" style={styles.postContainer} key={item.id}>
        <HStack alignItems="center">
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
          <View style={styles.postHeaderTxtContainer}>
            <Text style={styles.posterName}>{item.poster}</Text>
          </View>
          <Spacer />
          <Button px="6" h="10" mr="2" colorScheme="error" variant="outline">取消</Button>
        </HStack>
      </Box>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input variant="rounded" mb="2" mx="1" placeholder='ユーザ名入力' />
      <FlatList data={posts} renderItem={renderItem} scrollEnabled />
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
    marginBottom: 4,
    borderWidth: 1,
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
