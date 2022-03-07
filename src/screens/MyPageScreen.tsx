import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ListRenderItemInfo,
  ImageSourcePropType,
  RefreshControl,
} from 'react-native';
import {
  Avatar,
  Button,
  Text,
  Stack,
  Box,
  Pressable,
  Switch,
  Spacer,
  HStack,
  Center,
  Modal,
  Input,
  FlatList,
  Spinner,
  ScrollView,
} from 'native-base';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions'
import { delData } from '../scripts/asyncStore';
import { requestHttpGet, requestHttpPatch } from '../scripts/requestBase';
import { format } from 'date-fns';
import { DefaultAvator } from '../components/DefaultAvator';

type MyProfile = {
  id: string | number;
  nickname: string;
  imageUrl: string | undefined;
};

type VisitFriend = {
  id: string;
  profile: {
    id: string | number;
    user: string;
    nickname: string;
    profile_image: string;
  };
  last_visit: Date;
};

export const MyPageScreen = ({ navigation }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [myProfile, setMyProfile] = useState<MyProfile>({
    id: '',
    nickname: '',
    imageUrl: undefined,
  });
  const [blobImage, setBlobImage] = useState<Blob | null>(null);
  const [visitFriendList, setVisitFriendList] = useState<VisitFriend[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyProfile();
    getTodayVisitFriends();
  }, []);

  const getMyProfile = async () => {
    // ユーザ名とプロフ画像取得
    const res = await requestHttpGet('/api/v1/sns/myprofile/');
    console.log(res.data[0].profile_image);
    if (res.data.length) {
      const resData = res.data[0];
      setMyProfile((pre) => ({
        ...pre,
        id: resData.id,
        nickname: resData.nickname,
        imageUrl: resData.profile_image,
      }));
    }
  };

  const getTodayVisitFriends = async () => {
    const res = await requestHttpGet('/api/v1/sns/today-visit-friends/');
    setVisitFriendList(res.data);
  };

  const handleSaveName = async () => {
    // nickname変更処理
    if (newName) {
      const res = await requestHttpPatch(
        `/api/v1/sns/myprofile/${myProfile.id}/`,
        {
          nickname: newName,
        }
      );
      res.result && setMyProfile((pre) => ({ ...pre, nickname: newName }));
      setShowEditModal(false);
    }
  };

  const refreshItem = async () => {
    setRefreshing(true);
    await getTodayVisitFriends();
    setRefreshing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEfditing: true,
      aspoct: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const imageUri = await fetch(result.uri);
      const blob = await imageUri.blob();
      const res = await requestHttpPatch(
        `/api/v1/sns/myprofile/${myProfile.id}/`,
        {
          profile_image: result.base64,
        }
      );
      // const res = await fetch(`/api/v1/sns/myprofile/${myProfile.id}/`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   // send our base64 string as POST request
      //   body: JSON.stringify({
      //     image_url: result.base64,
      //   }),
      // })
      setMyProfile((pre) => ({ ...pre, imageUrl: imageUri.toString() }));
      setBlobImage(blob);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<VisitFriend>) => {
    return (
      <HStack
        alignItems="center"
        bg="white"
        p={2}
        borderBottomWidth={1}
        borderColor="blueGray.200"
        key={item.id}
        w="100%"
      >
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
        <Box ml={2}>
          <Text fontSize={16}>{item.profile.nickname}</Text>
          <Text color="blueGray.500">
            来店時間{format(new Date(item.last_visit), 'HH:mm')}
          </Text>
        </Box>
        <Spacer />
        <Box mr="2">
          <Text color="blueGray.600">通知送信</Text>
          <Switch size="sm" onTrackColor="green.400" />
        </Box>
        <Box>
          <Text color="blueGray.600">通知受取</Text>
          <Switch size="sm" onTrackColor="green.400" />
        </Box>
        <Box ml={4}>
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={() => alert('削除しますか？')}
          />
        </Box>
      </HStack>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      <Modal isOpen={showEditModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center h={16}>
              <Input w="100%" onChangeText={(value) => setNewName(value)} />
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowEditModal(false)}
              >
                キャンセル
              </Button>
              <Button
                bg="green.500"
                _pressed={{ backgroundColor: 'green.500' }}
                onPress={handleSaveName}
              >
                変更
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box p={2} position="relative">
        <Pressable
          position="absolute"
          zIndex={100}
          right="2"
          top="2"
          ml="4"
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={28} color="gray" />
        </Pressable>
        <HStack alignItems="center" mb={2}>
          <Pressable position="relative" onPress={pickImage}>
            {!myProfile.imageUrl ? (
              <DefaultAvator objSize="xl" iconSize={58} />
            ) : (
              <Avatar size="xl" source={{ uri: myProfile.imageUrl }} />
            )}
            <Center
              bg="blueGray.700"
              p={1}
              borderRadius={50}
              position="absolute"
              bottom="1"
              right="0"
            >
              <Feather name="camera" size={18} color="#d4d4d4" />
            </Center>
          </Pressable>
          <Box ml={2}>
            <Stack flexDirection="row" alignItems="center">
              <Pressable onPress={() => setShowEditModal(true)}>
                <Text fontSize="3xl">
                  {myProfile.nickname}
                  <Feather name="edit-2" size={15} color="gray" />
                </Text>
              </Pressable>
            </Stack>
            <Box flexDirection="row" justifyContent="space-between" ml={2}>
              <Pressable
                alignItems="center"
                onPress={() => navigation.navigate('Friends')}
              >
                <Text>友達</Text>
                <Text>10</Text>
              </Pressable>
            </Box>
          </Box>
        </HStack>
      </Box>
      <Box mt={4}>
        <HStack m={2} mb={1} alignItems="center">
          <Text
            fontSize={16}
            fontWeight="bold"
            letterSpacing={1}
            color="emerald.500"
          >
            本日来店した友達
          </Text>
          <Pressable p={2} pl={1} onPress={refreshItem}>
            <AntDesign name="reload1" size={16} color="#22d3ee" />
          </Pressable>
        </HStack>
        {refreshing && (
          <HStack
            position="absolute"
            top={20}
            zIndex={100}
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="lg" color="green.400" />
          </HStack>
        )}
        {!visitFriendList.length ? (
          <ScrollView
            height={300}
            refreshControl={
              <RefreshControl
                onRefresh={refreshItem}
                refreshing={refreshing}
                tintColor="#6ee7b7"
              />
            }
          >
            <Center>本日来店した友達はいません</Center>
          </ScrollView>
        ) : (
          <FlatList
            data={visitFriendList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                onRefresh={refreshItem}
                refreshing={refreshing}
                tintColor="#6ee7b7"
              />
            }
            scrollEnabled
            minHeight="200"
          />
        )}
      </Box>
    </SafeAreaView>
  );
};
