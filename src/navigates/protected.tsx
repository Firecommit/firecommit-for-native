import React, {Suspense} from 'react';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';
import {StackNavigatesType} from '&/types';
import {Spinner} from '&/components/Spinner';
import {useAuth} from '&/lib/auth';
import {useVerify} from '&/lib/verify';

const App = () => {
  const {signout} = useAuth();
  const {logout} = useVerify();
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      {/* <Outlet /> */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>App</Text>
        <Button mode="text" onPress={() => signout()}>
          サインアウト
        </Button>
        <Button mode="text" onPress={() => logout()}>
          ログアウト
        </Button>
      </View>
    </Suspense>
  );
};

export const protectedNavigates: StackNavigatesType = [
  {
    name: 'app',
    component: App,
    // children: [
    //   {
    //     name: 'tab',
    //     component: TabNavigates,
    //   },
    // ],
  },
];
