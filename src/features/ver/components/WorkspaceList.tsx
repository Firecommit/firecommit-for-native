import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';

export const WorkspaceList = () => {
  return (
    <List.Section style={{flex: 1, width: '100%'}}>
      <List.Subheader>参加済みのマップサーバー</List.Subheader>
      <ScrollView>
        {Object.keys({}).map(code => (
          <List.Item title="" onPress={() => {}} />
        ))}
      </ScrollView>
    </List.Section>
  );
};
