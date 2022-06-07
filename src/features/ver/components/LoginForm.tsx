import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import {useVerify} from '&/lib/verify';
import {useAuth} from '&/lib/auth';
import {ParticipatedList} from './ParticipatedList';
import {useBottomSheet} from '&/lib/bottom-sheet';

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = ({onSuccess}: LoginFormProps) => {
  const [code, setCode] = useState('');
  const {user} = useAuth();
  const {login} = useVerify();
  const {handleCloseModal} = useBottomSheet();
  return (
    <View style={{alignItems: 'center'}}>
      <Caption style={{textAlign: 'center'}}>
        マップサーバーは、あなたやスタッフが働く様子を映す場所です。
        招待コードを使って参加し、「コミット」を始めましょう。
      </Caption>
      <View style={{width: '100%', marginTop: 32}}>
        <TextInput
          label="招待コード"
          mode="outlined"
          value={code}
          onChangeText={text => setCode(text)}
          style={{marginBottom: 32}}
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          dark
          onPress={() => {
            Keyboard.dismiss();
            login({uid: `${user?.uid}`, code}).then(() => {
              if (onSuccess) onSuccess();
              handleCloseModal();
            });
          }}
          disabled={!code || !code.match(/\S/g)}>
          サーバーに参加する
        </Button>
      </View>
      <ParticipatedList
        onPress={text => {
          setCode(text);
        }}
      />
    </View>
  );
};
