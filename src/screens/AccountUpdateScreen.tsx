import React, { FC, useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, TextInput, useTheme } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthProvider';

export const AccountPictureUpdateScreen: FC = () => {
  const { currentUser, update } = useContext(AuthContext);
  const [name, setName] = useState<string>(`${currentUser.auth?.displayName}`);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 32,
      }}
    >
      <Paragraph>ファイルアップロード</Paragraph>
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!name.length}
        onPress={() => {
          setLoading(true);
          update('name', name).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};

export const AccountNameUpdateScreen: FC = () => {
  const { currentUser, update } = useContext(AuthContext);
  const [name, setName] = useState<string>(`${currentUser.auth?.displayName}`);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 32,
      }}
    >
      <TextInput
        label="氏名"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={name}
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
        style={{ marginBottom: 32, backgroundColor: '#fff' }}
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!name.length}
        onPress={() => {
          setLoading(true);
          update('name', name).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};

export const AccountEmailUpdateScreen: FC = () => {
  const { currentUser, update } = useContext(AuthContext);
  const [email, setEmail] = useState<string>(`${currentUser.auth?.email}`);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 32,
      }}
    >
      <TextInput
        label="メールアドレス"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        style={{ marginBottom: 32, backgroundColor: '#fff' }}
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!email.length}
        onPress={() => {
          setLoading(true);
          update('email', email).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};

export const AccountPasswordUpdateScreen: FC = () => {
  const { update } = useContext(AuthContext);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        padding: 32,
        backgroundColor: '#fff',
      }}
    >
      <TextInput
        label="パスワード"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={password}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        style={{ marginBottom: 32, backgroundColor: '#fff' }}
        secureTextEntry
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!password.length}
        onPress={() => {
          setLoading(true);
          update('password', password).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};
