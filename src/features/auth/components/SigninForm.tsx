import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import {Link} from '@react-navigation/native';
import {useAuth} from '&/lib/firebase';

type SigninFormProps = {
  onSuccess?: () => void;
};

export const SigninForm = ({onSuccess}: SigninFormProps) => {
  const [data, setData] = useState({email: '', password: ''});
  const {signin} = useAuth();

  return (
    <>
      <View>
        <TextInput
          label="メールアドレス"
          mode="outlined"
          value={data.email}
          autoCapitalize="none"
          onChangeText={text => setData(d => ({...d, email: text}))}
          style={{marginBottom: 16}}
          returnKeyType="done"
        />
        <TextInput
          label="パスワード"
          mode="outlined"
          autoCapitalize="none"
          value={data.password}
          onChangeText={text => setData(d => ({...d, password: text}))}
          style={{marginBottom: 16}}
          secureTextEntry
          returnKeyType="done"
        />
        <Button
          mode="contained"
          dark
          onPress={async () => {
            await signin(data);
            Keyboard.dismiss();
            if (onSuccess) onSuccess();
          }}>
          サインイン
        </Button>
      </View>
      <View style={{marginTop: 16}}>
        <Caption style={{fontSize: 14, marginBottom: 8, textAlign: 'center'}}>
          Firecommitを使うのは初めてですか？
        </Caption>
        <Link to="/signup" style={{color: '#0000ff', textAlign: 'center'}}>
          新規アカウント作成
        </Link>
      </View>
    </>
  );
};
