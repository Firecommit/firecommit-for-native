import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

type BottomSheetModalOptions = {
  snapPoints: Array<string | number>;
  component: () => React.ReactNode;
} | null;

type BottomSheetProviderProps = {
  children: React.ReactNode;
};

type BottomSheetContextType = {
  handlePresentModal: (arg: BottomSheetModalOptions) => void;
  handleCloseModal: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>({
  handlePresentModal: () => {},
  handleCloseModal: () => {},
});

const useBottomSheet = () => {
  const {handlePresentModal, handleCloseModal} = useContext(BottomSheetContext);
  return {handlePresentModal, handleCloseModal};
};

const BottomSheetProvider = ({children}: BottomSheetProviderProps) => {
  const BottomSheetRef = useRef<BottomSheetModal>(null);
  const [options, setOptions] = useState<BottomSheetModalOptions>(null);

  const handlePresentModal = useCallback((arg: BottomSheetModalOptions) => {
    setOptions(arg);
    BottomSheetRef.current?.present();
  }, []);
  const handleCloseModal = useCallback(() => {
    BottomSheetRef.current?.close();
  }, []);

  const value = useMemo(() => ({handlePresentModal, handleCloseModal}), []);
  return (
    <BottomSheetContext.Provider value={value}>
      <BottomSheetModalProvider>
        {children}
        <BottomSheetModal
          ref={BottomSheetRef}
          enablePanDownToClose
          snapPoints={options?.snapPoints || []}>
          <>
            <Button
              style={localStyle.close}
              mode="text"
              color="#333"
              onPress={handleCloseModal}>
              閉じる
            </Button>
            {options?.component()}
          </>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};

const localStyle = StyleSheet.create({
  close: {
    position: 'absolute',
    left: 8,
    top: 20,
  },
});

export {useBottomSheet, BottomSheetProvider};
