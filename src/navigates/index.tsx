import React, {useEffect, useState} from 'react';

import {connectActionSheet} from '@expo/react-native-action-sheet';
import {useAuth} from '&/lib/auth';
import {useNavigates} from '&/hooks/useNavigates';
import {Landing} from '&/features/misc';
import {StackParamList} from '&/types';

import {publicNavigates} from './public';
import {protectedNavigates} from './protected';
import {useVerify} from '&/lib/verify';

export const AppNavigates = connectActionSheet(() => {
  const {user} = useAuth();
  const {workspace} = useVerify();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 3000);
  }, []);

  const commonNavigates = [
    {name: 'landing', component: Landing, options: {headerShown: false}},
  ];
  const navigates = user && workspace ? protectedNavigates : publicNavigates;

  const element = useNavigates<StackParamList>(
    load ? navigates : commonNavigates,
    user ? 'verify' : 'auth',
  );

  return <>{element}</>;
});
