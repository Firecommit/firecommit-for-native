import React from 'react';

import {Layout} from '../components/Layout';
import {SignupForm} from '../components/SignupForm';

export const Signup = () => {
  return (
    <Layout title="アカウント作成">
      <SignupForm />
    </Layout>
  );
};
