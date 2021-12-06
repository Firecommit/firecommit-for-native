import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthProvider';

export const MapScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Headline>Map Page</Headline>
      <Button mode="contained" onPress={() => signout()}>
        サインアウト
      </Button>
    </View>
  );
};
