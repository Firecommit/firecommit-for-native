import React from 'react';
import {Layout} from '../components/Layout';
import {SigninForm} from '../components/SigninForm';
import {useVerify} from '&/lib/verify';
import {StackScreenProps} from '&/types';

export const Signin = ({navigation}: StackScreenProps) => {
  const {workspace} = useVerify();
  return (
    <Layout title="サインイン">
      <SigninForm
        onSuccess={() => !workspace && navigation.navigate('verify')}
      />
    </Layout>
  );
};
