import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {NameForm} from '../components/NameForm';

export const Username = () => {
  const [username, setUsername] = useState({firstName: '', lastName: ''});
  return (
    <Layout>
      <NameForm value={username} onChange={val => setUsername(val)} />
    </Layout>
  );
};
