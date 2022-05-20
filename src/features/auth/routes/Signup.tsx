import React from 'react';
import {StackNavigationProp} from '&/types';

import {Layout} from '../components/Layout';
import {SignupForm} from '../components/SignupForm';
import {useVerify} from '&/lib/verify';

export const Signup = ({navigation}: StackNavigationProp) => {
  const {workspace} = useVerify();
  return (
    <Layout title="アカウント作成">
      <SignupForm
        onSuccess={() => !workspace && navigation.navigate('verify')}
      />
    </Layout>
  );
};
