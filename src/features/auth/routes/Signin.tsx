import React from 'react';

import {Layout} from '../components/Layout';
import {SigninForm} from '../components/SigninForm';

export const Signin = () => {
  return (
    <Layout title="サインイン">
      <SigninForm />
    </Layout>
  );
};
