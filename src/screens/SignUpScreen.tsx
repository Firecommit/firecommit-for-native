import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, View } from 'react-native';
import {
  Button,
  Caption,
  Headline,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';

export const SignUpScreen = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const theme = useTheme();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Headline style={{ marginBottom: 16, fontWeight: 'bold' }}>
        アカウント作成
      </Headline>
      <View style={{ width: '100%', paddingHorizontal: 16, marginBottom: 16 }}>
        <TextInput
          label="氏名"
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="メールアドレス"
          mode="outlined"
          autoCapitalize="none"
          value={email}
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
          secureTextEntry
        />
        <Button
          mode="contained"
          dark
          onPress={() => signup(name, email, password)}
        >
          アカウント作成
        </Headline>
        <View
          style={{ width: '100%', paddingHorizontal: 16, marginBottom: 16 }}
        >
          <TextInput
            label="氏名"
            mode="outlined"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ marginBottom: 16 }}
            returnKeyType="done"
          />
          <TextInput
            label="メールアドレス"
            mode="outlined"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ marginBottom: 16 }}
            returnKeyType="done"
          />
          <TextInput
            label="パスワード"
            mode="outlined"
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{ marginBottom: 16 }}
            secureTextEntry
            returnKeyType="done"
          />
          <Button
            mode="contained"
            onPress={() => {
              signup(name, email, password);
              Keyboard.dismiss();
            }}
          >
            アカウント作成
          </Button>
        </View>
        <Caption style={{ fontSize: 14, marginBottom: 8 }}>
          すでにアカウントをお持ちですか？
        </Caption>
        <Link to="/SignIn" style={{ color: theme.colors.primary }}>
          サインイン
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};
