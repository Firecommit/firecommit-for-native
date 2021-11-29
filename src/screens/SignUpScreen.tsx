import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Caption,
  Headline,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { AuthProps } from '../types';
import { auth, db } from '../../firebase';

export const SignUpScreen = ({ navigation }: AuthProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const theme = useTheme();

  const onSignUp = () => {
    const data = {
      coordinate: {
        x: 0,
        y: 0,
      },
    };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        user?.updateProfile({
          displayName: name,
        });
        db.ref(`users/${user?.uid}`)
          .set(data)
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Headline style={{ marginBottom: 16 }}>アカウント作成</Headline>
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
        />
        <Button mode="contained" onPress={() => onSignUp()}>
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
  );
};
