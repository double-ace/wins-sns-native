import { Box, HStack, Skeleton } from 'native-base';

export const SkeletonItem = () => {
  return (
    <Box
      bg="white"
      px={4}
      py={3}
      borderBottomWidth={1}
      borderColor="blueGray.100"
    >
      <HStack alignItems="center">
        <Skeleton size={10} rounded="full" />
        <Skeleton.Text w="70%" ml={2} />
      </HStack>
    </Box>
  );
};
