import React from 'react'
import { HStack, Pressable } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'

export const HeaderIcon = ({ navigation }) => {
  return (
    <HStack>
      <Pressable mr={4} onPress={() => navigation.navigate('Notification')}>
        <AntDesign name="filetext1" size={24} color="white" />
      </Pressable>
      <Pressable
        mr={4}
        onPress={() => navigation.navigate('NotificationFromShop')}
      >
        <Entypo name="bell" size={24} color="white" />
      </Pressable>
    </HStack>
  )
}
