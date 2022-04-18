import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Caption, Headline, TextInput, Button, List } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthProvider';
import { ServerContext } from '../contexts/ServerProvider';
import { StackProps } from '../types';

export const LoginServerScreen = ({ navigation }: StackProps) => {
  const [invCode, setInvCode] = useState<string>('');
  const { signout, currentUser } = useContext(AuthContext);
  const { LoginServer, getServerName } = useContext(ServerContext);

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
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          dark
          onPress={() => {
            LoginServer(invCode);
          }}
          disabled={!invCode || !invCode.match(/\S/g)}
        >
          サーバーに参加する
        </Button>
        <Button
          style={{ marginTop: 16 }}
          mode="outlined"
          onPress={() => {
            signout();
          }}
        >
          サインアウト
        </Button>
      </View>
      <List.Section style={{ flex: 1, width: '100%' }}>
        <List.Subheader>参加済みのマップサーバー</List.Subheader>
        <ScrollView>
          {Object.keys({ ...currentUser.data?.workspace }).map((code) => (
            <List.Item
              title={getServerName(code)}
              onPress={() => LoginServer(code)}
            />
          ))}
        </ScrollView>
      </List.Section>
    </View>
  );
};
