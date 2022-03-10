import React, { createContext, FC, useState } from 'react';
import { Keyboard } from 'react-native';
import { DialogContent } from '../components/DialogContent';
import { ErrorProps } from '../types';

type DialogProps = {
  visible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  displayError: (res: ErrorProps) => void;
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
  const [error, setError] = useState<ErrorProps>({ msg: '', code: '' });
  const displayError = (res: ErrorProps) => {
    setError(res);
    showDialog();
  };

  return (
    <DialogContext.Provider
      value={{ visible, showDialog, hideDialog, displayError }}
    >
      <DialogContent error={error} />
      {children}
    </DialogContext.Provider>
  );
};
