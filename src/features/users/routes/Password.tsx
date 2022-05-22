import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {PasswordForm} from '../components/PasswordForm';

export const Password = () => {
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <PasswordForm value={password} onChange={text => setPassword(text)} />
    </Layout>
  );
};
