import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Caption,
  Headline,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';

export const SignInScreen = () => {
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Headline style={{ marginBottom: 16, fontWeight: 'bold' }}>
        サインイン
      </Headline>
      <View style={{ width: '100%', paddingHorizontal: 16, marginBottom: 16 }}>
        <TextInput
          label="メールアドレス"
          mode="outlined"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="パスワード"
          mode="outlined"
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ marginBottom: 16 }}
        />
        <Button mode="contained" onPress={() => signin(email, password)}>
          サインイン
        </Button>
      </View>
      <Caption style={{ fontSize: 14, marginBottom: 8 }}>
        Firecommitを使うのは初めてですか？
      </Caption>
      <Link to="/SignUp" style={{ color: theme.colors.primary }}>
        新規アカウント作成
      </Link>
    </View>
  );
};
