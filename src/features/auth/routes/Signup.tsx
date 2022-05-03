import React from 'react';

import {NavigatesProps} from '&/types';
import {Layout} from '../components/Layout';
import {SignupForm} from '../components/SignupForm';

export const Signup = ({navigation}: NavigatesProps) => {
  return (
    <Layout title="アカウント作成">
      <SignupForm onSuccess={() => navigation.navigate('app')} />
    </Layout>
  );
};
