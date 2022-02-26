import React, { useEffect, useState } from 'react';
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
  GestureResponderEvent,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  Box,
  Text,
  useColorModeValue,
  HStack,
  Link,
  Avatar,
  Spacer,
  Button,
} from 'native-base';
import {
  requestHttpGet,
  requestHttpPost,
  requestHttpDelete,
} from '../scripts/requestBase';

type RequestNestChild = {
  id: string;
  is_shop: boolean;
  profile: {
    id: number;
    nickname: string;
    imageUrl?: string;
  };
};
type RequestData = {
  id: string | number;
  req_from: string;
  req_to: RequestNestChild;
  approved: boolean;
};

type NonAppdData = {
  id: string | number;
  req_from: RequestNestChild;
  req_to: string;
  approved: boolean;
};

const initialLayout = {
  width: Dimensions.get('window').width,
};

export const FriendRequestScreen = () => {
  const [nonReqList, setNonReqList] = useState<any[]>([]);
  const [nonAppdList, setNonAppdList] = useState<any[]>([]);
  const [index, setIndex] = React.useState(0);
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
    getReqList();
    getAppdList();
  }, []);

  const getReqList = async () => {
    const res = await requestHttpGet('/api/v1/sns/get-friend-request/');
    setNonReqList(res.data);
  };

  const getAppdList = async () => {
    const res = await requestHttpGet('/api/v1/sns/non-appd-request/');
    setNonAppdList(res.data);
  };

  const handleDelete = async (
    e: GestureResponderEvent,
    id: string | number,
    isReq: boolean
  ) => {
    await requestHttpDelete(`/api/v1/sns/friend-request/${id}/`);
    isReq
      ? setNonReqList((preList) => [
          ...preList.filter((item) => item.id !== id),
        ])
      : setNonAppdList((preList) => [
          ...preList.filter((item) => item.id !== id),
        ]);
  };

  const renderReqItem = ({ item }: ListRenderItemInfo<RequestData>) => {
    return (
      <Box py="3" style={styles.postContainer} key={item.id.toString()}>
        <HStack alignItems="center">
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
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
            onPress={(e) => handleDelete(e, item.id, true)}
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
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
          <View style={styles.postHeaderTxtContainer}>
            <Text style={styles.posterName}>
              {item.req_from.profile.nickname}
            </Text>
          </View>
          <Spacer />
          <Button px="6" h="10" mr="2" colorScheme="error" variant="outline">
            拒否
          </Button>
          <Button px="6" h="10" bg="emerald.400" _text={{ fontWeight: 'bold' }}>
            許可
          </Button>
        </HStack>
      </Box>
    );
  };

  const RequestRoute = () => {
    return (
      <FlatList data={nonReqList} renderItem={renderReqItem} scrollEnabled />
    );
  };

  const NonAppdRoute = () => {
    return (
      <FlatList data={nonAppdList} renderItem={renderAppdItem} scrollEnabled />
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
