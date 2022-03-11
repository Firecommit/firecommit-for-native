import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/routers';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Caption, List, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../contexts/AuthProvider';

export const UserSettingScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase, string>;
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          height: 180,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar.Image
          size={80}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
        />
        <Title>{currentUser.auth?.displayName}</Title>
        <Caption>ID: {currentUser.auth?.uid}</Caption>
      </View>
      <List.Section>
        <List.Subheader style={{ backgroundColor: '#eee' }}>
          アカウント
        </List.Subheader>
        <View>
          <List.Item
            title="アイコン画像設定"
            style={{ borderBottomWidth: 1, borderColor: '#ccc' }}
            right={() => (
              <Icon
                name="chevron-right"
                color="#999"
                size={24}
                style={{ marginTop: 3 }}
              />
            )}
            onPress={() => {
              navigation.navigate('Picture');
            }}
          />
          <List.Item
            title="ユーザー名設定"
            style={{ borderBottomWidth: 1, borderColor: '#ccc' }}
            right={() => (
              <Icon
                name="chevron-right"
                color="#999"
                size={24}
                style={{ marginTop: 3 }}
              />
            )}
            onPress={() => {
              navigation.navigate('Name');
            }}
          />
          <List.Item
            title="メールアドレス設定"
            style={{ borderBottomWidth: 1, borderColor: '#ccc' }}
            right={() => (
              <Icon
                name="chevron-right"
                color="#999"
                size={24}
                style={{ marginTop: 3 }}
              />
            )}
            onPress={() => {
              navigation.navigate('Email');
            }}
          />
          <List.Item
            title="パスワード設定"
            style={{ borderBottomWidth: 1, borderColor: '#ccc' }}
            right={() => (
              <Icon
                name="chevron-right"
                color="#999"
                size={24}
                style={{ marginTop: 3 }}
              />
            )}
            onPress={() => {
              navigation.navigate('Password');
            }}
          />
        </View>
      </List.Section>
    </ScrollView>
  );
};
