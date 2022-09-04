import { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {
  Avatar,
  Button,
  Input,
  Box,
  HStack,
  Spacer,
  Center,
  Text,
  Pressable,
} from 'native-base'
import { requestHttpGet, requestHttpPost } from '../scripts/requestBase'
import { SkeletonItem } from '../components/SkeletonUserItem'
import { DefaultAvator } from '../components/DefaultAvator'

type Profile = {
  user: string
  nickname: string
  profileImage: string | null
}

type UserList = {
  id: string
  profile: Profile
}

export const SearchScreen = ({ navigation }) => {
  const [userList, setUserList] = useState<UserList[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const onChangeKeyword = async (keyword: string) => {
    setIsSearching(true)
    // 入力値でユーザをフィルター
    console.log('keyword: ', keyword)
    if (keyword) {
      const res = await requestHttpGet(`/api/v1/sns/users/?keyword=${keyword}`)
      setUserList(res.data)
    }
    setIsSearching(false)
  }

  // 友達申請
  const handleReq = async (id: string) => {
    // const res = await requestHttpPost
    const param = {
      reqTo: id,
    }
    const res = await requestHttpPost(
      '/api/v1/sns/friend-request/',
      param,
      true
    )
    setUserList((pre) => [...pre.filter((item) => item.id !== res.data.reqTo)])
  }

  const renderItem = ({ item }: ListRenderItemInfo<UserList>) => {
    return (
      <Box p={3} borderBottomWidth={1} borderColor="blueGray.200" key={item.id}>
        <HStack alignItems="center">
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
          <Box ml={3}>
            <Text fontSize={16}>{item.profile.nickname}</Text>
          </Box>
          <Spacer />
          <Button
            px="6"
            h="10"
            bg="emerald.400"
            rounded="full"
            _text={{ fontWeight: 'bold' }}
            onPress={() => handleReq(item.id)}
          >
            友達申請
          </Button>
        </HStack>
      </Box>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Input
          variant="rounded"
          my="2"
          mx="1"
          placeholder="ユーザ名入力"
          autoFocus
          onChangeText={(value) => onChangeKeyword(value)}
        />
        {isSearching ? (
          <SkeletonItem />
        ) : !userList.length ? (
          <Center>一致するユーザが見つかりません</Center>
        ) : (
          <FlatList data={userList} renderItem={renderItem} scrollEnabled />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFB',
    paddingVertical: 8,
  },
})
