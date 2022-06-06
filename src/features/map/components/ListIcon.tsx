import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

type ListIconProps = {
  active?: boolean;
  uri: string;
};

export const ListIcon = ({active, uri}: ListIconProps) => {
  const theme = useTheme();
  const localStyles = StyleSheet.create({
    wrap: {
      width: 64,
      height: 64,
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      borderWidth: 3,
      borderColor: theme.colors.primary,
      borderRadius: 5,
    },
    image: {
      width: 50,
      height: 50,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
    },
  });
  return (
    <View style={[localStyles.wrap, active && localStyles.active]}>
      <Image style={localStyles.image} source={{uri}} />
    </View>
  );
};
