import React from 'react';
import {ActivityIndicator, ColorValue, View} from 'react-native';
import {commonStyles} from '&/styles';

type SpinnerProps = {
  size?: 'lg' | 'sm';
  color?: ColorValue;
};

export const Spinner = ({size, color}: SpinnerProps) => {
  return (
    <View style={[commonStyles.container, commonStyles.horizontal]}>
      <ActivityIndicator
        size={size === 'lg' ? 'large' : 'small'}
        color={color}
      />
    </View>
  );
};
