import React, {useState} from 'react';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useAuth} from '&/lib/auth';
import {useUpdate} from '&/lib/firebase';

type EmailFormProps = {
  value: string;
  onChange: (text: string) => void;
};

export const EmailForm = ({value, onChange}: EmailFormProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const update = useUpdate();
  return (
    <>
      <TextInput
        label="メールアドレス"
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
            update.email({user, value}).then(() => {
              setTimeout(() => setLoading(false), 1000);
            });
          }
        }}>
        保存
      </Button>
    </>
  );
};
