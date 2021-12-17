import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { userData } from '../../assets/userData.json';

type UserData = {
  id: string | number;
  name: string;
};

const posts: UserData[] = userData;

export const FollowScreen = () => {
  const [follow, setFollow] = useState('フォロー中');

  const renderItem = ({ item }) => {
    return (
      <View style={styles.userContainer} key={item.id}>
        <View style={styles.userHeader}>
          <Avatar
            size="medium"
            rounded
            avatarStyle={styles.avatar}
            icon={{ name: 'home' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <View style={styles.userHeaderTxtContainer}>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.followContainer}
            onPress={() => setFollow('フォローを解除する!')}
          >
            <Text style={styles.followText}>{follow}</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 8,
  },
  userContainer: {
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
  userHeader: {
    flexDirection: 'row',
  },
  userHeaderTxtContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 8,
  },
  userName: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  followContainer: {
    position: 'absolute',
    right: 0,
    top: 5,
    width: 150,
    height: 35,
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 30,
    alignItems: 'center',
  },
  followText: {
    // position:,
    color: 'red',
    textAlign: 'center',
    fontSize: 17,
  },
  userDate: {
    color: '#A8A8A8',
  },
  button: {
    color: 'red',
    textAlign: 'center',
    fontSize: 1,
  },
  input: {
    width: 100,
  },
});
