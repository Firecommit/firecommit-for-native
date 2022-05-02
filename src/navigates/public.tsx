import React from 'react';
import {lazyImport} from '&/utils/lazyImport';
import {StackParamList, NavigatesType} from '&/types';

const {AuthRoutes} = lazyImport(() => import('&/features/auth'), 'AuthRoutes');

export const publicNavigates: NavigatesType<StackParamList> = [
  {
    name: 'auth',
    component: AuthRoutes,
    options: {headerShown: false},
  },
];
