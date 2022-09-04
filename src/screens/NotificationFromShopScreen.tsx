import { Center, Heading, Text, Box } from 'native-base'
import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { requestHttpGet } from '../scripts/requestBase'
import { format } from 'date-fns'

type ShopPost = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export const NotificationFromShopScreen = () => {
  const [postList, setPostList] = useState<ShopPost[]>([])

  useEffect(() => {
    getShopPosts()
  }, [])

  const getShopPosts = async () => {
    const res = await requestHttpGet('/api/v1/sns/shop-posts/')
    res.data.length && setPostList(res.data)
  }

  return (
    <Box flex="1" p={4} bg="teal.50">
      {!postList.length ? (
        <Center>本日のお知らせはありません。</Center>
      ) : (
        <Box>
          <Text fontSize="xs" color="blueGray.500">
            {format(new Date(postList[0]?.createdAt), 'yyyy/mm/dd HH:mm')}
          </Text>
          <Heading mb={4}>{postList[0]?.title}</Heading>
          <Text>{postList[0]?.content}</Text>
        </Box>
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
