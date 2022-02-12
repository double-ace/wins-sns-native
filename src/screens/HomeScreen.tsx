import { Flex, Stack, Button, Modal, HStack } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
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
    <SafeAreaView style={styles.container}>
      <Flex justifyContent="center" alignItems="center" bg="white" py="8">
        <View style={styles.point}>
          <Text style={styles.pointText}>{result}pt</Text>
        </View>
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
            style={styles.qr}
            my="6"
            _text={{ fontSize: 16, fontWeight: 'bold' }}
            onPress={() => setShowQRCode(true)}
          >
            QRコード表示
          </Button>
        </View>
      </Flex>
      <View style={styles.log}>
        <Text style={styles.pointLog}>ポイント履歴</Text>
      </View>
      <FlatList data={posts} renderItem={renderItem} scrollEnabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  point: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
    height: 190,
    elevation: 2,
    borderColor: '#00EFF0',
    borderRadius: 95,
    borderWidth: 15,
    marginVertical: 10,
  },
  pointText: {
    backgroundColor: '#fff',
    fontSize: 30,
  },
  qr: {
    width: 280,
    height: 45,
    borderRadius: 110,
    backgroundColor: '#00EF80',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  qrText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  log: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },
  pointLog: {
    fontSize: 16,
    paddingLeft: 20,
  },
});
