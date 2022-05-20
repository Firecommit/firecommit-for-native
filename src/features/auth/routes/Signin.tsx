import React from 'react';
import {StackNavigationProp} from '&/types';

import {Layout} from '../components/Layout';
import {SigninForm} from '../components/SigninForm';
import {useVerify} from '&/lib/verify';

export const Signin = ({navigation}: StackNavigationProp) => {
  const {workspace} = useVerify();
  return (
    <Layout title="サインイン">
      <SigninForm
        onSuccess={() => !workspace && navigation.navigate('verify')}
      />
    </Layout>
  );
};
