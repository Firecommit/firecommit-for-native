import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Caption, Headline, TextInput, Button } from 'react-native-paper';
import { JoinedContext } from '../contexts/JoinedProvider';
import { NavigationProps } from '../types';

export const JoinScreen = ({ navigation }: NavigationProps) => {
  const [invCode, setInvCode] = useState<string>();
  const { onJoined } = useContext(JoinedContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 64,
      }}
    >
      <Headline style={{ marginBottom: 16 }}>マップサーバーへ参加</Headline>
      <Caption>
        マップサーバーは、あなたやスタッフが働く様子を映す場所です。
      </Caption>
      <Caption>招待コードを使って参加し、「コミット」を始めましょう。</Caption>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
          marginTop: 32,
        }}
      >
        <TextInput
          label="招待コード"
          mode="outlined"
          value={invCode}
          onChangeText={(text) => setInvCode(text)}
          style={{ marginBottom: 32 }}
        />
        <Button mode="contained" onPress={() => onJoined(true)}>
          サーバーに参加する
        </Button>
      </View>
    </View>
  );
};
