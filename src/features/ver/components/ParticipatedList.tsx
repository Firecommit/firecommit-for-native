import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {useVerify} from '&/lib/verify';
import {ListItem} from '&/components/List';

type ParticipatedListProps = {
  onPress?: (text: string) => void;
};

export const ParticipatedList = ({onPress}: ParticipatedListProps) => {
  const {workspaces} = useVerify();
  return (
    workspaces && (
      <List.Section style={{width: '100%'}}>
        <List.Subheader>参加済みのマップサーバー</List.Subheader>
        <ScrollView style={{maxHeight: 300}}>
          {workspaces.map(item => (
            <ListItem
              key={item.id}
              title={item.name}
              subTitle={item.id}
              iconURL={item.iconURL}
              onPress={() => onPress && onPress(item.id)}
            />
          ))}
        </ScrollView>
      </List.Section>
    )
  );
};
