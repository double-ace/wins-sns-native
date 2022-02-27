import { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, TextInput } from 'react-native';
import {
  Link,
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
  FormControl,
} from 'native-base';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { postData } from '../../assets/postData.json';
import { delData } from '../scripts/asyncStore';
import { requestHttpGet, requestHttpPatch } from '../scripts/requestBase';
import { previousDay } from 'date-fns';

type PostData = {
  id: string;
  poster: string;
  date: Date | string;
  content: string;
};

type Nickname = {
  id: string | number;
  nickname: string;
};

const posts: any[] = postData;

export const MyPageScreen = ({ navigation }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [nickname, setNickname] = useState<Nickname>({ id: '', nickname: '' });

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    // ユーザ名とプロフ画像取得
    const nameRes = await requestHttpGet('/api/v1/sns/nickname/');
    setNickname({ id: nameRes.data[0].id, nickname: nameRes.data[0].nickname });
    // 友達一覧取得
    // const friendRes = await requestHttpGet('');
  };

  const handleSaveName = async () => {
    // nickname変更処理
    const res = await requestHttpPatch(`/api/v1/sns/nickname/${nickname.id}/`, {
      nickname: newName,
    });
    res.result && setNickname((pre) => ({ ...pre, nickname: newName }));
    setShowEditModal(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Box
        bg="white"
        px={2}
        py={2}
        borderBottomWidth={1}
        borderColor="blueGray.200"
      >
        <HStack alignItems="center">
          <Link onPress={() => console.log('Works!')}>
            <Avatar size="md"></Avatar>
          </Link>
          <Box ml={2}>
            <Text fontSize={16}>{item.poster}</Text>
            <Text color="blueGray.500">来店時間{item.date}</Text>
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
          <Spacer />
          <Box position="absolute" right={0}>
            <AntDesign
              name="delete"
              size={24}
              color="red"
              onPress={() => alert('削除しますか？')}
            />
          </Box>
        </HStack>
      </Box>
    );
  };

  const NameEditModal = () => {
    return (
      <Modal isOpen={showEditModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center h={16}>
              <Input
                style={{ width: '100%' }}
                onChangeText={(value) => setNewName(value)}
              />
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
              <Button bg="green.400" onPress={handleSaveName}>
                変更
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      <NameEditModal />
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
          <Link position="relative" onPress={() => alert('Works!')}>
            <Avatar size="xl"></Avatar>
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
          </Link>
          <Box ml={2}>
            <Stack flexDirection="row" alignItems="center">
              <Pressable onPress={() => setShowEditModal(true)}>
                <Text fontSize="3xl">
                  {nickname.nickname}
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
      <View>
        <Box
          m={2}
          mb={1}
          _text={{
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 1,
            color: 'emerald.500',
          }}
        >
          本日来店した友達
        </Box>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
        />
      </View>
    </SafeAreaView>
  );
};
