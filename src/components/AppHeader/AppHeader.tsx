import React from 'react';
import {Image, TouchableOpacity, useWindowDimensions} from 'react-native';
import {Appbar, Title, useTheme} from 'react-native-paper';

export const AppHeader = () => {
  const theme = useTheme();
  return (
    <Appbar.Header
      style={{zIndex: 100}}
      theme={{colors: {primary: theme.colors.surface}}}>
      <TouchableOpacity
        onPress={() => {}}
        style={{marginLeft: 16, marginRight: 8}}>
        <Image
          style={{
            borderWidth: 0.5,
            borderColor: '#ccc',
            borderRadius: 5,
            width: 40,
            height: 40,
          }}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/firecommit-1e1d5.appspot.com/o/users%2Ficon%2Fdefault_user.png?alt=media&token=8f30cf5a-db74-4a09-b4e6-ec26670ba538',
          }}
        />
      </TouchableOpacity>
      <Title>Firecommit</Title>
    </Appbar.Header>
  );
};
