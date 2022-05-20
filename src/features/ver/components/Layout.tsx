import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Headline} from 'react-native-paper';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({children, title}: LayoutProps) => {
  return (
    <KeyboardAvoidingView style={localStyles.container} behavior="padding">
      <Headline style={localStyles.title}>{title}</Headline>
      <View style={localStyles.formfield}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formfield: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
