import { Box, Button, Divider, HStack, Spacer, Switch } from 'native-base';
import React from 'react';
import { StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { delData } from '../scripts/asyncStore';

export const SettingsScreen = ({ navigation }) => {
  const handleAlertLogout = () => {
    Alert.alert('ログアウトしますか？', '', [
      {
        text: 'キャンセル',
      },
      {
        text: 'ログアウト',
        onPress: logout,
      },
    ]);
  };
  const logout = async () => {
    try {
      await delData('access');
      navigation.navigate('SignIn');
    } catch (e) {
      console.log('logoutError========');
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Box bg="white" borderBottomWidth={1} borderColor="gray.100">
        <Box
          mt={4}
          pl={2}
          pb={1}
          _text={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }}
        >
          通知
        </Box>
        <HStack alignItems="center" p={2}>
          <Text>お店からの通知</Text>
          <Spacer />
          <Switch size="sm" onTrackColor="green.400" />
        </HStack>
        <HStack alignItems="center" p={2}>
          <Text>友達来店の通知</Text>
          <Spacer />
          <Switch size="sm" onTrackColor="green.400" />
        </HStack>
        <HStack alignItems="center" p={2}>
          <Text>友達への来店通知</Text>
          <Spacer />
          <Switch size="sm" onTrackColor="green.400" />
        </HStack>
        <Divider my={2} />
        <Box
          mt={3}
          pl={2}
          pb={1}
          _text={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }}
        >
          アカウント
        </Box>
        <Button
          p={2}
          variant="ghost"
          colorScheme="secondary"
          textAlign="left"
          _text={{ textAlign: 'left' }}
          onPress={handleAlertLogout}
        >
          ログアウト
        </Button>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  postContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  avatar: {
    backgroundColor: '#cccccc',
  },
  postHeaderTxtContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 8,
  },
  postContent: {},
  posterName: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  postDate: {
    color: '#A8A8A8',
  },
  fab: {},
});
