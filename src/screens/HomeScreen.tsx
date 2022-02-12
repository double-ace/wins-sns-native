import { Flex, Button, Modal, HStack, Center, Text, Box } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { pointData } from '../../assets/pointData.json';
import QRCode from 'react-native-qrcode-svg';

type PointData = {
  id: string | number;
  date: Date | string;
  point: string;
};

const posts: PointData[] = pointData;
const result = posts
  .reduce((sum, item) => sum + Number(item.point), 0)
  .toLocaleString();

export const HomeScreen = ({ userId }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const renderItem = ({ item }) => {
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
        <Text>{item.date}</Text>
        <Text>{item.point}pt</Text>
      </HStack>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex justifyContent="center" alignItems="center" bg="white" py={10}>
        <Center
          h={190}
          w={190}
          borderRadius={100}
          borderWidth={15}
          borderColor="#00EFF0"
        >
          <Text fontSize={30}>{result}pt</Text>
        </Center>
        <View>
          <Modal isOpen={showQRCode} onClose={() => setShowQRCode(false)}>
            <Modal.CloseButton
              onPress={() => setShowQRCode(false)}
              position="absolute"
              top="16"
            />
            <QRCode size={200} value={userId} />
          </Modal>
          <Button
            w={250}
            h={45}
            borderRadius={100}
            bg="green.400"
            my="6"
            _text={{ fontSize: 16, fontWeight: 'bold' }}
            onPress={() => setShowQRCode(true)}
          >
            QRコード表示
          </Button>
        </View>
      </Flex>
      <Box
        bg="white"
        borderBottomWidth={1}
        borderColor="#E9EAEB"
        _text={{ fontSize: 16, paddingLeft: 2 }}
      >
        ポイント履歴
      </Box>
      <FlatList data={posts} renderItem={renderItem} scrollEnabled />
    </SafeAreaView>
  );
};
