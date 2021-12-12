import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { postData } from '../../assets/postData.json';

type PostData = {
  id: string;
  poster: string;
  date: Date | string;
  content: string;
};

const posts: PostData[] = postData;

export const MyPageScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
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
          <View style={styles.dustBox}>
            <AntDesign
              name="delete"
              size={24}
              color="red"
              onPress={() => alert('削除しますか？')}
            />
          </View>
        </View>
        <View style={styles.postContent}>
          <Text>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userInfoContainer}>
          <Avatar
            size={120}
            rounded
            avatarStyle={styles.avatar}
            icon={{ name: 'home' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          >
            <Avatar.Accessory
              size={32}
              onPress={() => alert('edit profile image')}
            />
          </Avatar>
          <View style={styles.userInfoRightContainer}>
            <Text style={styles.name}>my name</Text>
            <View style={styles.followContainer}>
              <TouchableOpacity
                style={styles.follow}
                onPress={() => alert('post press')}
              >
                <Text>投稿</Text>
                <Text>10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.follow}
                onPress={() => navigation.navigate('Follow')}
              >
                <Text>フォロー</Text>
                <Text>10</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('follower press')}>
                <Text style={styles.follow}>フォロワー</Text>
                <Text>10</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Button
            title="ポイント管理"
            buttonStyle={styles.pointManageBtn}
            onPress={() => navigation.navigate('PointManage')}
          />
          <Button
            title="ログアウト"
            titleStyle={styles.logoutTitle}
            buttonStyle={styles.logoutBtn}
            onPress={() => alert('logout')}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  dustBox: {
    position: 'absolute',
    right: 0,
  },
});
