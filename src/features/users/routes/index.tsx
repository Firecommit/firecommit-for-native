import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {TabScreenProp} from '&/types';

export const Profile = ({route, navigation}: TabScreenProp) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Page</Text>
    </View>
  );
};
