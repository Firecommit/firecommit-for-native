import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useUpdate} from '&/lib/firebase';
import {useAuth} from '&/lib/auth';

type NameFormProps = {
  value: {firstName: string; lastName: string};
  onChange: (val: {firstName: string; lastName: string}) => void;
};

export const NameForm = ({value, onChange}: NameFormProps) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const theme = useTheme();
  const {user} = useAuth();
  const update = useUpdate();

  useEffect(() => {
    onChange({firstName, lastName});
  }, [firstName, lastName]);

  return (
    <>
      <View style={[{marginBottom: 32}]}>
        <TextInput
          label="姓"
          mode="outlined"
          activeOutlineColor={theme.colors.accent}
          value={value.lastName}
          autoCapitalize="none"
          onChangeText={setLastName}
          style={{marginBottom: 16}}
        />
        <TextInput
          label="名"
          mode="outlined"
          activeOutlineColor={theme.colors.accent}
          value={value.firstName}
          autoCapitalize="none"
          onChangeText={setFirstName}
        />
      </View>
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!(value.firstName && value.lastName)}
        onPress={() => {
          setLoading(true);
          if (user) {
            update.name({user, value}).then(() => {
              setTimeout(() => setLoading(false), 1000);
            });
          }
        }}>
        保存
      </Button>
    </>
  );
};
