import {lazyImport} from '&/utils/lazyImport';
import {StackNavigatesType} from '&/types';

const {AuthNavigates} = lazyImport(
  () => import('&/features/auth'),
  'AuthNavigates',
);

const {VerNavigates} = lazyImport(
  () => import('&/features/ver'),
  'VerNavigates',
);

export const publicNavigates: StackNavigatesType = [
  {
    name: 'auth',
    component: AuthNavigates,
    options: {headerShown: false},
  },
  {
    name: 'verify',
    component: VerNavigates,
    options: {headerShown: false},
  },
];
