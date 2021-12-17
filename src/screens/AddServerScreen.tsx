import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Caption, Headline, TextInput, Button } from 'react-native-paper';
import { ServerContext } from '../contexts/ServerProvider';
import { DrawerProps } from '../types';

export const AddServerScreen = ({ navigation }: DrawerProps) => {
  const [invCode, setInvCode] = useState<string>('');
  const { LoginServer } = useContext(ServerContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 64,
      }}
    >
      <Button
        style={{ marginRight: 'auto' }}
        icon="chevron-left"
        mode="text"
        onPress={() => navigation.navigate('Tab')}
      >
        戻る
      </Button>
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
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          onPress={() => {
            LoginServer(invCode);
            navigation.navigate('Tab');
          }}
          disabled={!invCode || !invCode.match(/\S/g)}
        >
          サーバーに参加する
        </Button>
      </View>
    </View>
  );
};
