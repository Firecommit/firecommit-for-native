import React, { useContext } from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DialogContext } from '../contexts/DialogProvider';
import { ErrorProps } from '../types';

export const DialogContent = ({ error }: { error: ErrorProps }) => {
  const { visible, hideDialog } = useContext(DialogContext);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          <Icon name="alert-rhombus" color="#FC8132" size={32} />
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
