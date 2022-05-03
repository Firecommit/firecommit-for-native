import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Headline} from 'react-native-paper';
import {commonStyles} from '&/styles';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({children, title}: LayoutProps) => {
  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
      <Headline style={localStyles.title}>{title}</Headline>
      <View style={localStyles.formfield}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
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
