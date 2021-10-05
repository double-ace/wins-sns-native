import React from 'react';
import { StyleSheet, SafeAreaView, View, FlatList, Text } from 'react-native';
import { Avatar, FAB } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { postData } from '../../assets/postData.json';

type PostData = {
  id: string | number;
  poster: string;
  date: Date | string;
  content: string;
};

const posts: PostData[] = postData;

export const HomeScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer} key={item.id}>
        <View style={styles.postHeader}>
          <Avatar
            size="medium"
            rounded
            avatarStyle={styles.avatar}
            icon={{ name: 'home' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
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
      <FAB
        placement="right"
        color="#00e383"
        buttonStyle={styles.fab}
        icon={
          <MaterialCommunityIcons
            name="playlist-edit"
            size={24}
            color="black"
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFB',
    paddingHorizontal: 8,
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
