import React, { useContext } from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { DialogContext } from '../contexts/DialogProvider';

export const DialogContent = ({ error }: { error: string }) => {
  const { visible, hideDialog } = useContext(DialogContext);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{ textAlign: 'center' }}>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{error}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
