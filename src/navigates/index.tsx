import React from 'react';

import {useNavigates} from '&/hooks/useNavigates';
import {publicNavigates} from './public';
import {protectedNavigates} from './protected';
import {Landing} from '&/features/misc';
import {useAuth} from '&/lib/firebase';
import {NavigatesType, StackParamList} from '&/types';

export const AppNavigates = () => {
  const auth = useAuth();

  const commonNavigates: NavigatesType<StackParamList> = [
    {name: 'landing', component: Landing, options: {headerShown: false}},
  ];
  const navigates = auth.user ? protectedNavigates : publicNavigates;

  const element = useNavigates<StackParamList>(
    [...commonNavigates, ...navigates],
    'landing',
  );

  return <>{element}</>;
};
