import React from 'react'
import { HStack, Spinner } from 'native-base'

export const Loading = () => {
  return (
    <HStack flex="1" justifyContent="center" alignItems="center">
      <Spinner size="lg" color="green.400" />
    </HStack>
  )
}
