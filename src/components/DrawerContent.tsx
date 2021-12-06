import React, { FC } from 'react';
import { Text, View } from 'react-native';

export const DrawerContent: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
};
