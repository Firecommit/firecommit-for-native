/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Avatar, Caption, List, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {useAuth} from '&/lib/auth';
import {UserStackParamList, UserStackScreenProps} from '../types';

export const Account = ({navigation}: UserStackScreenProps) => {
  const {user} = useAuth();
  const {showActionSheetWithOptions} = useActionSheet();
  const data = {
    picture: {title: 'アイコン画像設定'},
    username: {title: 'ユーザー名設定'},
    email: {title: 'メールアドレス設定'},
    password: {title: 'パスワード設定'},
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={{
          height: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar.Image size={80} source={{uri: `${user?.photoURL}`}} />
        <Title>{user?.displayName}</Title>
        <Caption
          onPress={() => {
            const option: ActionSheetOptions = {
              options: ['ユーザーIDのコピー', 'キャンセル'],
              cancelButtonIndex: 1,
            };
            const indexFn = (i?: number) => {
              if (i === 0 && user) Clipboard.setString(user.uid);
            };
            showActionSheetWithOptions(option, indexFn);
          }}>
          ID: {user?.uid}
        </Caption>
      </View>
      <List.Section>
        <List.Subheader style={{backgroundColor: '#eee'}}>
          アカウント
        </List.Subheader>
        <View>
          {Object.entries(data).map(([key, val]) => (
            <List.Item
              key={key}
              title={val.title}
              style={{borderBottomWidth: 1, borderColor: '#ccc'}}
              right={() => (
                <Icon
                  name="chevron-right"
                  color="#999"
                  size={24}
                  style={{marginTop: 3}}
                />
              )}
              onPress={() => {
                navigation.navigate(key as keyof UserStackParamList);
              }}
            />
          ))}
        </View>
      </List.Section>
    </ScrollView>
  );
};
