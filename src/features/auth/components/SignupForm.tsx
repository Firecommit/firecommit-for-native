import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import {Link} from '@react-navigation/native';
import {useAuth} from '&/lib/auth';
import {commonStyles} from '&/styles';

type SigninFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = ({onSuccess}: SigninFormProps) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const {signup} = useAuth();

  return (
    <>
      <View>
        <View style={[commonStyles.horizontal, {marginBottom: 16}]}>
          <TextInput
            label="姓"
            mode="outlined"
            value={data.lastName}
            onChangeText={text => setData(d => ({...d, lastName: text}))}
            style={{width: '48%'}}
            returnKeyType="done"
          />
          <TextInput
            label="名"
            mode="outlined"
            value={data.firstName}
            onChangeText={text => setData(d => ({...d, firstName: text}))}
            style={{width: '48%'}}
            returnKeyType="done"
          />
        </View>
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
          onPress={() => {
            Keyboard.dismiss();
            signup(data).then(() => {
              if (onSuccess) onSuccess();
            });
          }}>
          アカウント作成
        </Button>
      </View>
      <View style={{marginTop: 16}}>
        <Caption style={{fontSize: 14, marginBottom: 8, textAlign: 'center'}}>
          すでにアカウントをお持ちですか？
        </Caption>
        <Link to="/signin" style={{color: '#0000ff', textAlign: 'center'}}>
          サインイン
        </Link>
      </View>
    </>
  );
};
