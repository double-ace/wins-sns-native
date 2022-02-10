import React from 'react';
import { HStack, Spinner, Text } from 'native-base';

export const Loading = () => {
  return (
    <HStack flex="1" justifyContent="center" alignItems="center">
      <Spinner size="lg" color="primary.500" />
    </HStack>
  );
};
