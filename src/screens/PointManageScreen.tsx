
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { pointData } from '../../assets/pointData.json';

type PointData = {
  id: string | number;
  date: Date | string;
  point: string;
};

const posts: PointData[] = pointData;
const result = posts
  .reduce((sum, item) => sum + Number(item.point), 0)
  .toLocaleString();

export const PointManageScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.point_list} key={item.id}>
        <Text>{item.date}</Text>
        <Text>{item.point}pt</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.point}>
          <Text style={styles.point_text}>{result}pt</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.qr} onPress={() => alert('qr表示')}>
            <Text style={styles.qr_text}>QRコード表示</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.log}>
        <Text style={styles.point_log}>ポイント履歴</Text>
      </View>
      <FlatList data={posts} renderItem={renderItem} scrollEnabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
  point_text: {
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
  qr_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  log: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },
  point_log: {
    fontSize: 16,
    paddingLeft: 20,
  },
  point_list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 25,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
});
