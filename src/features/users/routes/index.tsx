import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppHeader} from '&/components/AppHeader';
import {Account} from './Account';
import {Picture} from './Picture';
import {Username} from './Username';
import {Email} from './Email';
import {Password} from './Password';

export const UserNavigates = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="account"
      screenOptions={{
        // eslint-disable-next-line react/no-unstable-nested-components
        header: props => <AppHeader {...props} />,
      }}>
      <Stack.Screen
        name="account"
        component={Account}
        options={{title: 'アカウント設定'}}
      />
      <Stack.Screen
        name="picture"
        component={Picture}
        options={{title: 'アイコン画像設定'}}
      />
      <Stack.Screen
        name="username"
        component={Username}
        options={{title: 'ユーザー名設定'}}
      />
      <Stack.Screen
        name="email"
        component={Email}
        options={{title: 'メールアドレス設定'}}
      />
      <Stack.Screen
        name="password"
        component={Password}
        options={{title: 'パスワード設定'}}
      />
    </Stack.Navigator>
  );
};
