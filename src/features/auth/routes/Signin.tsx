import React from 'react';

import {NavigatesProps} from '&/types';
import {Layout} from '../components/Layout';
import {SigninForm} from '../components/SigninForm';

export const Signin = ({navigation}: NavigatesProps) => {
  return (
    <Layout title="サインイン">
      <SigninForm onSuccess={() => navigation.navigate('app')} />
    </Layout>
  );
};
