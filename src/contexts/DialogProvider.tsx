import React, { createContext, FC, useState } from 'react';
import { Keyboard } from 'react-native';
import { DialogContent } from '../components/DialogContent';

type DialogProps = {
  visible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  displayError: (msg: string) => void;
};

export const DialogContext = createContext<DialogProps>({
  visible: false,
  showDialog: () => {},
  hideDialog: () => {},
  displayError: () => {},
});

export const DialogProvider: FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
    Keyboard.dismiss();
  };
  const hideDialog = () => setVisible(false);
  const [error, setError] = useState('');
  const displayError = (msg: string) => setError(msg);

  return (
    <DialogContext.Provider
      value={{ visible, showDialog, hideDialog, displayError }}
    >
      <DialogContent error={error} />
      {children}
    </DialogContext.Provider>
  );
};
