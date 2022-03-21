import React, { FC } from 'react';
import { Appbar, useTheme } from 'react-native-paper';

export const MaterialHeader: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Appbar.Header
      style={{
        zIndex: 100,
      }}
      theme={{
        colors: {
          primary: theme.colors.surface,
        },
      }}
    >
      {children}
    </Appbar.Header>
  );
};
