import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '&/lib/auth';

export const VerNavigates = () => {
  const {signout} = useAuth();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>App Page</Text>
      <Button
        onPress={() => {
          signout();
        }}>
        サインアウト
      </Button>
    </View>
  );
};
