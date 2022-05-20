import React from 'react';
import {AppHeader} from '&/components/AppHeader';
import {AppContent} from '&/features/app';
import {StackNavigatesType} from '&/types';

export const protectedNavigates: StackNavigatesType = [
  {
    name: 'app',
    component: AppContent,
    options: {
      header: () => <AppHeader />,
    },
  },
];
