import React, {Suspense} from 'react';
import {lazyImport} from '&/utils/lazyImport';
import {StackParamList, NavigatesType} from '&/types';
import {Spinner} from '&/components/Spinner';

const {VerRoutes} = lazyImport(() => import('&/features/ver'), 'VerRoutes');

const App = () => {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <VerRoutes />
    </Suspense>
  );
};

export const protectedNavigates: NavigatesType<StackParamList> = [
  {
    name: 'app',
    component: App,
    options: {headerShown: false},
  },
];
