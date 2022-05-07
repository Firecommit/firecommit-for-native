import React, {Suspense} from 'react';
import {lazyImport} from '&/utils/lazyImport';
import {StackParamList, NavigatesType} from '&/types';
import {Spinner} from '&/components/Spinner';

const {VerNavigates} = lazyImport(
  () => import('&/features/ver'),
  'VerNavigates',
);

const App = (props: any) => {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <VerNavigates {...props} />
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
