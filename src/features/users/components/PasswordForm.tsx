import React, {useState} from 'react';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useAuth} from '&/lib/auth';
import {useUpdate} from '&/lib/firebase';

type PasswordFormProps = {
  value: string;
  onChange: (text: string) => void;
};

export const PasswordForm = ({value, onChange}: PasswordFormProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const update = useUpdate();
  return (
    <>
      <TextInput
        label="パスワード"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={value}
        autoCapitalize="none"
        onChangeText={onChange}
        style={{marginBottom: 32}}
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!value.length}
        onPress={() => {
          setLoading(true);
          if (user) {
            update.password({user, value}).then(() => {
              setTimeout(() => setLoading(false), 1000);
            });
          }
        }}>
        保存
      </Button>
    </>
  );
};
