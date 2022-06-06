/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {IconButton, List, useTheme} from 'react-native-paper';
import {ListIcon} from './ListIcon';

type ListItemProps = {
  active?: boolean;
  title: string;
  subTitle?: string;
  iconURL?: string;
  onPress?: () => void;
  onSetting?: () => void;
};

export const ListItem = ({
  active = false,
  title,
  subTitle,
  iconURL = 'https://firebasestorage.googleapis.com/v0/b/firecommit-1e1d5.appspot.com/o/users%2Ficon%2Fdefault_user.png?alt=media&token=8f30cf5a-db74-4a09-b4e6-ec26670ba538',
  onPress,
  onSetting,
}: ListItemProps) => {
  const theme = useTheme();
  return (
    <List.Item
      style={active && {backgroundColor: '#eee'}}
      title={title}
      description={subTitle}
      left={() => <ListIcon active={active} uri={iconURL} />}
      right={() => (
        <IconButton icon="dots-vertical" size={20} onPress={onSetting} />
      )}
      onPress={onPress}
    />
  );
};
