import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import { Link, Avatar, Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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

export const HomeScreen = ({ navigation }) => {
  const [access, setAccess] = useState('');
  const [shop, setShop] = useState<string[]>([]);

  useEffect(() => {
    const sample = async () => {
      const aa = await getData('access');
      aa ? setAccess(aa) : null;
    };

    sample();
  });

  const getMyShop = async () => {
    // const res: AxiosResponse<string[]> = await axios.get(
    //   'http://192.168.11.2:8080/api/v1/core/belong-to/'
    // );
    const res = await requestHttpGet('/api/v1/core/belong-to/');
    res.data[0] ? setShop(res.data) : null;
    alert(res.data[0].shop);
  };

  const renderItem = ({ item }: ListRenderItemInfo<PostData>) => {
    return (
      <View style={styles.postContainer} key={item.id}>
        <View style={styles.postHeader}>
          <Link onPress={() => alert('Works!')}>
            <Avatar size="md" />
          </Link>
          <View style={styles.postHeaderTxtContainer}>
            <Text style={styles.posterName}>{item.poster}</Text>
            <Text style={styles.postDate}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.postContent}>
          <Text>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
