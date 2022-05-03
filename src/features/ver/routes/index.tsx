import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '&/lib/firebase';

export const VerRoutes = () => {
  const {signout} = useAuth();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>App Page</Text>
      <Button
        onPress={async () => {
          await signout();
        }}>
        サインアウト
      </Button>
    </View>
  );
};
