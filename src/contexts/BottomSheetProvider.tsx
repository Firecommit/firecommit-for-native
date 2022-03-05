import React, {
  FC,
  useRef,
  useMemo,
  useCallback,
  createContext,
  ReactNode,
  useState,
} from 'react';
import { View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

type BottomSheetProps = {
  presentModalHandler: () => void;
  showBottomSheet: (node: ReactNode) => void;
};

export const BottomSheetContext = createContext<BottomSheetProps>({
  presentModalHandler: () => {},
  showBottomSheet: (node: ReactNode) => {},
});

export const BottomSheetProvider: FC = ({ children }) => {
  const [content, setContent] = useState<ReactNode>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['94%'], []);
  const presentModalHandler = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const Backdrop = () => {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.3,
        }}
      />
    );
  };

  const showBottomSheet = useCallback(
    (node: ReactNode) => setContent(node),
    []
  );

  const memo = useMemo<BottomSheetProps>(
    () => ({ presentModalHandler, showBottomSheet }),
    []
  );

  return (
    <BottomSheetContext.Provider value={memo}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          backdropComponent={Backdrop}
          enablePanDownToClose
        >
          {content}
        </BottomSheetModal>
        {children}
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};
