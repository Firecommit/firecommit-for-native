import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {EmailForm} from '../components/EmailForm';

export const Email = () => {
  const [email, setEmail] = useState('');
  return (
    <Layout>
      <EmailForm value={email} onChange={text => setEmail(text)} />
    </Layout>
  );
};
