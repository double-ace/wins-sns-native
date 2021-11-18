import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { requestHttpPost } from '../scripts/requestBase';

export const CreatePostScreen = () => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    const token = requestHttpPost('/api/v1/sns/post/', {
      shop: '',
      post: content,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBtn}>
        <Button title="キャンセル" type="clear" />
        <Button
          title="投稿"
          buttonStyle={styles.createBtn}
          onPress={handlePost}
        />
      </View>
      <TextInput
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={(value) => setContent(value)}
        placeholder="入力してください"
        editable
        style={styles.textBox}
        maxLength={150}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  headerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBox: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
  },
  createBtn: {
    backgroundColor: '#4bb88a',
    width: 96,
    borderRadius: 40,
  },
});