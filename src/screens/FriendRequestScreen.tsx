import * as React from 'react';
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
import { postData } from '../../assets/postData.json';

type RequestData = {
  id: string | number;
  name: string;
  date_time: Date | string;
};

const posts: RequestData[] = postData;

const RequestRoute = () => {
  return <FlatList data={posts} renderItem={renderReqItem} scrollEnabled />;
};

const ApproveRoute = () => {
  return <FlatList data={posts} renderItem={renderAppItem} scrollEnabled />;
};

const initialLayout = {
  width: Dimensions.get('window').width,
};
const renderScene = SceneMap({
  request: RequestRoute,
  approve: ApproveRoute,
});

const renderReqItem = ({ item }: ListRenderItemInfo<RequestData>) => {
  return (
    <Box py="3" style={styles.postContainer} key={item.id}>
      <HStack alignItems="center">
        <Link onPress={() => console.log('Works!')}>
          <Avatar size="md"></Avatar>
        </Link>
        <View style={styles.postHeaderTxtContainer}>
          <Text style={styles.posterName}>{item.name}</Text>
        </View>
        <Spacer />
        <Button px="6" h="10" mr="2" colorScheme="error" variant="outline">
          取消
        </Button>
      </HStack>
    </Box>
  );
};

const renderAppItem = ({ item }: ListRenderItemInfo<RequestData>) => {
  return (
    <Box py="3" style={styles.postContainer} key={item.id}>
      <HStack alignItems="center">
        <Link onPress={() => console.log('Works!')}>
          <Avatar size="md"></Avatar>
        </Link>
        <View style={styles.postHeaderTxtContainer}>
          <Text style={styles.posterName}>{item.name}</Text>
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

export const FriendRequestScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'request',
      title: '申請中',
    },
    {
      key: 'approve',
      title: '承認待ち',
    },
  ]);

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
