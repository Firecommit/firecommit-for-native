import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
  return (
    <KeyboardAvoidingView style={localStyles.container} behavior="padding">
      <View style={localStyles.formfield}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  formfield: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
