import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Portal, Dialog, Paragraph, Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DialogContext } from '../contexts/DialogProvider';
import { ErrorProps } from '../types';

export const DialogContent = ({ error }: { error: ErrorProps }) => {
  const { visible, hideDialog } = useContext(DialogContext);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          <Icon name="alert-rhombus" color="#999" size={32} />
          {'\n'}
          エラーが発生しました。
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>{error.msg}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>閉じる</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
