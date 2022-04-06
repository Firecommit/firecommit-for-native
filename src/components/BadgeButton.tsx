import React from 'react';
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

type BadgeButtonProps = TouchableOpacityProps & {
  icon: string;
  color: string;
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const BadgeButton = ({
  icon,
  color,
  dark,
  style,
  ...rest
}: BadgeButtonProps) => {
  return (
    <TouchableOpacity style={style} onPress={rest.onPress}>
      <Surface
        style={[
          {
            width: 56,
            height: 56,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          },
          dark ? { backgroundColor: color } : null,
        ]}
      >
        <Icon name={icon} color={dark ? '#fff' : color} size={28} />
      </Surface>
    </TouchableOpacity>
  );
};
