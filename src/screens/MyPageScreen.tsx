import { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ListRenderItemInfo,
  RefreshControl,
  Platform,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
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
  FormControl,
  WarningOutlineIcon,
  Input,
  FlatList,
  Spinner,
  ScrollView,
  Divider,
} from 'native-base'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {
  requestHttpGet,
  requestHttpPatch,
  requestHttpPatchMultiPartFormData,
} from '../scripts/requestBase'
import { format } from 'date-fns'
import { DefaultAvator } from '../components/DefaultAvator'

type SnsProfile = {
  id: string
  snsId: string
  profile: string | null
}

type MyProfile = {
  id: string
  nickname: string
  imageUrl: string | undefined
  snsProfile: SnsProfile
}

type VisitFriend = {
  id: string
  profile: {
    id: string | number
    user: string
    nickname: string
    profileImage: string
  }
  lastVisit: Date
}

export const MyPageScreen = ({ navigation }) => {
  const [showNameEditModal, setShowNameEditModal] = useState(false)
  const [showSnsIdEditModal, setShowSnsIdEditModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newSnsId, setNewSnsId] = useState('')
  const [existedId, setExistedId] = useState(false)
  const [myProfile, setMyProfile] = useState<MyProfile>({
    id: '',
    nickname: '',
    imageUrl: undefined,
    snsProfile: {
      id: '',
      snsId: '',
      profile: '',
    },
  })
  const [friendNum, setFriendNum] = useState(0)
  const [blobImage, setBlobImage] = useState<Blob | null>(null)
  const [visitFriendList, setVisitFriendList] = useState<VisitFriend[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [refreshingForPress, setRefreshingForPress] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    getMyProfile()
    getNumOfFriends()
    getTodayVisitFriends()
  }, [])

  useEffect(() => {
    isFocused && getNumOfFriends()
  }, [isFocused])

  const getMyProfile = async () => {
    // ユーザ名とプロフ画像取得
    const res = await requestHttpGet('/api/v1/sns/myprofile/')
    console.log(res.data[0].profileImage)
    if (res.data.length) {
      const resData = res.data[0]
      setMyProfile((pre) => ({
        ...pre,
        id: resData.user,
        nickname: resData.nickname,
        imageUrl: resData.profileImage,
        snsProfile: resData.snsProfile,
      }))
    }
  }

  const getNumOfFriends = async () => {
    // 友達数取得
    const res = await requestHttpGet('/api/v1/sns/num-of-friends/')
    res.data?.numOfFrineds && setFriendNum(res.data.numOfFrineds)
  }

  const getTodayVisitFriends = async () => {
    const res = await requestHttpGet('/api/v1/sns/today-visit-friends/')
    setVisitFriendList(res.data)
  }

  const handleSaveNickname = async (
    value: string,
    target: 'nickname' | 'snsId'
  ) => {
    if (!value) {
      return
    }

    if (target === 'nickname') {
      // nickname変更処理
      const res = await requestHttpPatch(
        `/api/v1/sns/myprofile/${myProfile.id}/`,
        {
          nickname: value,
        }
      )
      res.result && setMyProfile((pre) => ({ ...pre, nickname: value }))
      setShowNameEditModal(false)
    } else {
      // snsID変更処理
      const res = await requestHttpPatch(
        `/api/v1/sns/sns-profiles/${myProfile.snsProfile.id}/`,
        {
          snsId: value,
        }
      )
      res.result &&
        setMyProfile((pre) => ({
          ...pre,
          snsProfile: {
            id: pre.snsProfile.id,
            snsId: value,
            profile: pre.snsProfile.profile,
          },
        }))
      setShowSnsIdEditModal(false)
    }
  }

  const refreshItem = async (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(true)
    await getTodayVisitFriends()
    setState(false)
  }

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('no permission')
        return
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      permitEditing: true,
      allowsEditing: true,
      aspoct: [4, 3],
      quality: 1,
      base64: true,
    })
    if (!result.cancelled) {
      const imageUri = await fetch(result.uri)
      console.log('imageUri: ', imageUri)

      // Blob
      const blob = await imageUri.blob()
      const ext = blob.type.split('/')[1]
      console.log('blobType: ', blob.type)
      console.log('blobSize: ', blob.size)
      console.log('keys: ', Object.keys(blob))

      // File
      const imageFile = new File([blob], `sample.jpg`, {
        type: blob.type,
      })
      console.log('fileSize: ', imageFile.size)

      // FormData
      const formData = new FormData()
      formData.append('profileImage', blob, `sample.jpg`)
      // formData.append('profileImage', {
      //   name: 'filename.jpg',
      //   type: 'jpg',
      //   uri: result.uri.replace('file://', ''),
      // });

      const res = await requestHttpPatchMultiPartFormData(
        `/api/v1/sns/myprofile/${myProfile.id}/`,
        // { profileImage: blob },
        formData,
        // blob,
        // imageFile,
        blob.type
      )

      // const res = await fetch(`/api/v1/sns/myprofile/${myProfile.id}/`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   // send our base64 string as POST request
      //   body: JSON.stringify({
      //     imageUrl: result.base64,
      //   }),
      // })
      setMyProfile((pre) => ({ ...pre, imageUrl: result.uri.toString() }))
      // setBlobImage(blob);
    }
  }

  const openSnsIdModal = () => {
    setNewSnsId(myProfile.snsProfile.snsId)
    setShowSnsIdEditModal(true)
  }

  const changeSnsId = async (value: string) => {
    // SNSIDの重複チェック
    if (!value) {
      setNewSnsId(value)
      return
    }
    const res = await requestHttpGet(
      `/api/v1/sns/snsid/search/?sns_id=${value}`
    )
    console.log(res.data)
    if (res.data) {
      if (res.data.exist === true) {
        setExistedId(true)
      } else {
        existedId === true && setExistedId(false)
      }
    }
    setNewSnsId(value)
  }

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
          {!item.profile.profileImage ? (
            <DefaultAvator />
          ) : (
            <Avatar
              size="md"
              source={{ uri: item.profile.profileImage }}
            ></Avatar>
          )}
        </Pressable>
        <Box ml={2}>
          <Text fontSize={16}>{item.profile.nickname}</Text>
          <Text color="blueGray.500" fontSize="xs">
            来店時間 {format(new Date(item.lastVisit), 'HH:mm')}
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
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* ニックネーム変更モーダル */}
      <Modal isOpen={showNameEditModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center h={16}>
              <FormControl>
                <FormControl.Label>名前</FormControl.Label>
                <Input w="100%" onChangeText={(value) => setNewName(value)} />
              </FormControl>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowNameEditModal(false)}
              >
                キャンセル
              </Button>
              <Button
                bg="green.500"
                _pressed={{ backgroundColor: 'green.500' }}
                onPress={() => handleSaveNickname(newName, 'nickname')}
              >
                変更
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* snsId変更モーダル */}
      <Modal isOpen={showSnsIdEditModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center h={24}>
              <FormControl isInvalid={existedId}>
                <FormControl.Label>ID</FormControl.Label>
                <Input
                  w="100%"
                  value={newSnsId}
                  onChangeText={(value) => changeSnsId(value)}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  このIDは既に使われています
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowSnsIdEditModal(false)}
              >
                キャンセル
              </Button>
              <Button
                bg="green.500"
                _pressed={{ backgroundColor: 'green.500' }}
                onPress={() => handleSaveNickname(newName, 'snsId')}
              >
                変更
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* myプロフィール情報表示エリア */}
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
        <HStack alignItems="flex-start" mb={2}>
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
              <Pressable onPress={() => setShowNameEditModal(true)}>
                <Text fontSize="3xl" fontWeight="bold">
                  {myProfile.nickname}
                  <Feather name="edit-2" size={15} color="gray" />
                </Text>
              </Pressable>
            </Stack>
            <Stack flexDirection="row" alignItems="center">
              <Pressable onPress={openSnsIdModal}>
                <Text fontSize="xs" fontWeight="bold" color="blueGray.600">
                  {myProfile.snsProfile.snsId}
                  <Feather name="edit-2" size={10} color="gray" />
                </Text>
              </Pressable>
            </Stack>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              ml={2}
              mt={2}
            >
              <Pressable
                alignItems="center"
                onPress={() => navigation.navigate('Friends')}
              >
                <Text letterSpacing={1}>友達</Text>
                <Text>{friendNum.toString()}</Text>
              </Pressable>
            </Box>
          </Box>
        </HStack>
      </Box>
      {/* 当日来店友達表示エリア */}
      <Box mt={8}>
        <HStack ml={2} alignItems="center">
          <Text
            fontSize={16}
            fontWeight="bold"
            letterSpacing={1}
            color="emerald.500"
          >
            本日来店した友達
          </Text>
          <Pressable
            p={2}
            pl={1}
            onPress={() => refreshItem(setRefreshingForPress)}
          >
            <AntDesign name="reload1" size={16} color="#22d3ee" />
          </Pressable>
        </HStack>
        <Divider mb={1} />
        {refreshingForPress && (
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
                onRefresh={() => refreshItem(setRefreshing)}
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
                onRefresh={() => refreshItem(setRefreshing)}
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
  )
}
