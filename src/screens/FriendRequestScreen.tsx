import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  SafeAreaView,
  Pressable,
  ListRenderItemInfo,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Box,
  Text,
  useColorModeValue,
  HStack,
  Avatar,
  Spacer,
  Button,
} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  requestHttpGet,
  requestHttpDelete,
  requestHttpPatch,
} from '../scripts/requestBase';
import { DefaultAvator } from '../components/DefaultAvator';

type RequestNestChild = {
  id: string;
  is_shop: boolean;
  profile: {
    user: string;
    nickname: string;
    profile_image: string | null;
  };
};
type RequestData = {
  id: string;
  req_from: string;
  req_to: RequestNestChild;
  approved: boolean;
};

type NonAppdData = {
  id: string;
  req_from: RequestNestChild;
  req_to: string;
  approved: boolean;
};

const initialLayout = {
  width: Dimensions.get('window').width,
};

export const FriendRequestScreen = () => {
  const [nonReqList, setNonReqList] = useState<RequestData[]>([]);
  const [nonAppdList, setNonAppdList] = useState<NonAppdData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = React.useState(0);
  const isFocused = useIsFocused();

  const [routes] = React.useState([
    {
      key: 'request',
      title: '申請中',
    },
    {
      key: 'appd',
      title: '承認待ち',
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      getReqList();
      getAppdList();
    }
  }, [isFocused]);

  const getReqList = async () => {
    const res = await requestHttpGet('/api/v1/sns/get-friend-request/');
    setNonReqList(res.data);
  };

  const getAppdList = async () => {
    const res = await requestHttpGet('/api/v1/sns/non-appd-request/');
    setNonAppdList(res.data);
  };

  const refreshReqItem = async () => {
    setRefreshing(true);
    await getReqList();
    setRefreshing(false);
  };

  const refreshAppdItem = async () => {
    setRefreshing(true);
    await getAppdList();
    setRefreshing(false);
  };

  // 申請承認削除処理
  const handleDelete = async (id: string | number, type: 'req' | 'appd') => {
    await requestHttpDelete(`/api/v1/sns/friend-request/${id}/`);
    type === 'req'
      ? setNonReqList((preList) => [
          ...preList.filter((item) => item.id !== id),
        ])
      : setNonAppdList((preList) => [
          ...preList.filter((item) => item.id !== id),
        ]);
  };

  // 承認許可処理
  const handleAllow = async (id: string | number) => {
    await requestHttpPatch(`/api/v1/sns/non-appd-request/${id}/`, {
      approved: true,
    });
    setNonAppdList((preList) => [...preList.filter((item) => item.id !== id)]);
  };

  const renderReqItem = ({ item }: ListRenderItemInfo<RequestData>) => {
    return (
      <Box py="3" style={styles.postContainer} key={item.id.toString()}>
        <HStack alignItems="center">
          <Pressable>
            {!item.req_to.profile.profile_image ? (
              <DefaultAvator />
            ) : (
              <Avatar
                size="md"
                source={{ uri: item.req_to.profile.profile_image }}
              ></Avatar>
            )}
          </Pressable>
          <Box style={styles.postHeaderTxtContainer} maxWidth={150}>
            <Text style={styles.posterName}>
              {item.req_to.profile.nickname}
            </Text>
          </Box>
          <Spacer />
          <Button
            px="6"
            h="10"
            mr="2"
            colorScheme="error"
            variant="outline"
            rounded="full"
            onPress={() => handleDelete(item.id, 'req')}
          >
            取消
          </Button>
        </HStack>
      </Box>
    );
  };

  const renderAppdItem = ({ item }: ListRenderItemInfo<NonAppdData>) => {
    return (
      <Box py="3" style={styles.postContainer} key={item.id.toString()}>
        <HStack alignItems="center">
          <Pressable>
            {!item.req_from.profile.profile_image ? (
              <DefaultAvator />
            ) : (
              <Avatar
                size="md"
                source={{ uri: item.req_from.profile.profile_image }}
              ></Avatar>
            )}
          </Pressable>
          <View style={styles.postHeaderTxtContainer}>
            <Text style={styles.posterName}>
              {item.req_from.profile.nickname}
            </Text>
          </View>
          <Spacer />
          <Button
            px="6"
            h="10"
            mr="2"
            colorScheme="error"
            variant="outline"
            rounded="full"
            onPress={() => handleDelete(item.id, 'appd')}
          >
            拒否
          </Button>
          <Button
            px="6"
            h="10"
            bg="emerald.400"
            rounded="full"
            _pressed={{ backgroundColor: 'green.500' }}
            _text={{ fontWeight: 'bold' }}
            onPress={() => handleAllow(item.id)}
          >
            許可
          </Button>
        </HStack>
      </Box>
    );
  };

  const RequestRoute = () => {
    return (
      <FlatList
        data={nonReqList}
        renderItem={renderReqItem}
        refreshControl={
          <RefreshControl
            onRefresh={refreshReqItem}
            refreshing={refreshing}
            tintColor="#6ee7b7"
          />
        }
        scrollEnabled
      />
    );
  };

  const NonAppdRoute = () => {
    return (
      <FlatList
        data={nonAppdList}
        renderItem={renderAppdItem}
        refreshControl={
          <RefreshControl
            onRefresh={refreshAppdItem}
            refreshing={refreshing}
            tintColor="#6ee7b7"
          />
        }
        scrollEnabled
      />
    );
  };

  const renderScene = SceneMap({
    request: RequestRoute,
    appd: NonAppdRoute,
  });

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: any, i: number) => i
    );
    return (
      <Box flexDirection="row" bg="white">
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue('#000', '#e5e5e5')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            index === i
              ? 'green.300'
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={i.toString()}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      />
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
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  avatar: {
    backgroundColor: '#cccccc',
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
