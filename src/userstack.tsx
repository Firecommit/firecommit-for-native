import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserSettingScreen } from './screens/UserSettingScreen';
import {
  AccountEmailUpdateScreen,
  AccountNameUpdateScreen,
  AccountPasswordUpdateScreen,
  AccountPictureUpdateScreen,
} from './screens/AccountUpdateScreen';
import { MaterialHeader } from './components/MaterialHeader';

export const UserStackNavigator: FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="UserSetting"
      screenOptions={{
        headerShown: true,
        header: ({ options, navigation }) => (
          <MaterialHeader>
            {navigation.getState().index !== 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ marginLeft: 16, marginRight: 8 }}
              >
                <Icon name="chevron-left" color="#333" size={32} />
              </TouchableOpacity>
            ) : null}
            <Appbar.Content title={<Title>{options.title}</Title>} />
          </MaterialHeader>
        ),
      }}
    >
      <Stack.Screen
        name="UserSetting"
        component={UserSettingScreen}
        options={{ title: 'アカウント設定' }}
      />
      <Stack.Screen
        name="Picture"
        component={AccountPictureUpdateScreen}
        options={{ title: 'アイコン画像設定' }}
      />
      <Stack.Screen
        name="Name"
        component={AccountNameUpdateScreen}
        options={{ title: 'ユーザー名設定' }}
      />
      <Stack.Screen
        name="Email"
        component={AccountEmailUpdateScreen}
        options={{ title: 'メールアドレス設定' }}
      />
      <Stack.Screen
        name="Password"
        component={AccountPasswordUpdateScreen}
        options={{ title: 'パスワード設定' }}
      />
    </Stack.Navigator>
  );
};
