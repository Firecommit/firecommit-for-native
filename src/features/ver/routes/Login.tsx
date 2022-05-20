import React from 'react';
import {Layout} from '../components/Layout';
import {LoginForm} from '../components/LoginForm';

export const Login = () => {
  return (
    <Layout title="マップサーバーへ参加">
      <LoginForm />
    </Layout>
  );
};
