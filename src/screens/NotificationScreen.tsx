import { HStack, Spacer, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, ListRenderItemInfo } from 'react-native'
import { formatDate } from '../scripts/date'
import { requestHttpGet } from '../scripts/requestBase'

type Message = {
  id: string
  title: string
  content: string
  createdAt: string
  user: string
  msgType: string
}

export const NotificationScreen = () => {
  const [msgList, setMsgList] = useState<Message[]>([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const res = await requestHttpGet('/api/v1/sns/messages/')
    res.data.length && setMsgList([...res.data])
  }

  const renderItem = ({ item }: ListRenderItemInfo<Message>) => {
    return (
      <HStack
        justifyContent="space-between"
        px="2"
        py="6"
        bg="white"
        borderBottomWidth={1}
        borderColor="blueGray.200"
        key={item.id}
      >
        <Text mr={2} color="blueGray.500">
          {formatDate(item.createdAt)}
        </Text>
        <Text>{item.content}</Text>
        <Spacer />
      </HStack>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList data={msgList} renderItem={renderItem} scrollEnabled />
    </SafeAreaView>
  )
}
