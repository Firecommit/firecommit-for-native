import React, {useEffect, useState} from 'react';

import {StackParamList} from '&/types';
import {useAuth} from '&/lib/auth';
import {useNavigates} from '&/hooks/useNavigates';

import {publicNavigates} from './public';
import {protectedNavigates} from './protected';
import {Landing} from '&/features/misc';

export const AppNavigates = () => {
  const {user} = useAuth();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 3000);
  }, []);

  const commonNavigates = [
    {name: 'landing', component: Landing, options: {headerShown: false}},
  ];
  const navigates = user ? protectedNavigates : publicNavigates;

  const element = useNavigates<StackParamList>(
    load ? navigates : commonNavigates,
  );

  return <>{element}</>;
};
