import React from 'react';
import {lazyImport} from '&/utils/lazyImport';
import {StackParamList, NavigatesType} from '&/types';

const {AuthNavigates} = lazyImport(
  () => import('&/features/auth'),
  'AuthNavigates',
);

export const publicNavigates: NavigatesType<StackParamList> = [
  {
    name: 'auth',
    component: AuthNavigates,
    options: {headerShown: false},
  },
];
