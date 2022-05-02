import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {useAuth} from '&/lib/firebase';
import {NavigatesProps} from '&/types';

export const Landing = ({navigation}: NavigatesProps) => {
  const {user} = useAuth();

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (user) {
        navigation.navigate('app');
      } else {
        navigation.navigate('auth');
      }
    }, 3000);
    return () => clearTimeout(timeId);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Landing Page</Text>
    </View>
  );
};
