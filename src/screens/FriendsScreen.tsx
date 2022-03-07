import { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Alert,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import { Avatar, Button, HStack, Spacer, Pressable } from 'native-base';
import { requestHttpDelete, requestHttpGet } from '../scripts/requestBase';
import { DefaultAvator } from '../components/DefaultAvator';

type Profile = {
  id: number;
  user: string;
  nickname: string;
  profile_image: string | null;
};

type FriendData = {
  id: string | number;
  profile: Profile;
};

export const FriendsScreen = () => {
  const [friendList, setFriendList] = useState<FriendData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getFriend();
  }, []);

  const getFriend = async () => {
    const res = await requestHttpGet('/api/v1/sns/friends/');
    setFriendList(res.data);
  };

  const delFriend = async (id: string | number) => {
    const res = await requestHttpGet(`/api/v1/sns/friend/?friend=${id}`);
    console.log(res.data);
    const FriendId = res.data[0].id;
    const deleteRes = await requestHttpDelete(
      `/api/v1/sns/del-friend/${FriendId}/`
    );

    if (deleteRes.result) {
      setFriendList((pre) => [...pre.filter((item) => item.id !== id)]);
    }
  };

  const handleDel = async (id: string | number) => {
    Alert.alert('削除しますか？', '', [
      { text: 'キャンセル' },
      { text: '削除', onPress: () => delFriend(id) },
    ]);
  };

  const refreshItem = async () => {
    setRefreshing(true);
    await getFriend();
    setRefreshing(false);
  };

  const renderItem = ({ item }: ListRenderItemInfo<FriendData>) => {
    return (
      <HStack style={styles.userContainer} alignItems="center" key={item.id}>
        <Pressable>
          {!item.profile.profile_image ? (
            <DefaultAvator />
          ) : (
            <Avatar
              size="md"
              source={{ uri: item.profile.profile_image }}
            ></Avatar>
          )}
        </Pressable>
        <View style={styles.userHeaderTxtContainer}>
          <Text style={styles.userName}>{item.profile.nickname}</Text>
        </View>
        <Spacer />
        <Button
          px="6"
          h="10"
          mr="2"
          colorScheme="error"
          variant="outline"
          onPress={() => handleDel(item.id)}
        >
          削除
        </Button>
      </HStack>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friendList}
        renderItem={renderItem}
        scrollEnabled
        refreshControl={
          <RefreshControl
            onRefresh={refreshItem}
            refreshing={refreshing}
            tintColor="#6ee7b7"
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
  },
  userContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },
  avatar: {
    backgroundColor: '#cccccc',
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
