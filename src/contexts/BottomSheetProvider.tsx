import React, {
  FC,
  useRef,
  useMemo,
  useCallback,
  createContext,
  ReactNode,
  useState,
} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ModalOptionsType = {
  snapPoints: string[];
  component: () => ReactNode;
  backdrop?: boolean;
  bottom?: number;
};

type ModalHandlerEvent = {
  onAnimated?: (from: number, to: number) => void;
  onEnd?: () => void;
};

type BottomSheetProps = {
  presentModalHandler: (options: ModalOptionsType) => void;
  closeModalHandler: () => void;
  useAnimatedModalHandler: (options: ModalHandlerEvent) => void;
};

export const BottomSheetContext = createContext<BottomSheetProps>({
  presentModalHandler: () => {},
  useAnimatedModalHandler: () => {},
  closeModalHandler: () => {},
});

export const BottomSheetProvider: FC = ({ children }) => {
  const [component, setComponent] = useState<ReactNode>(null);
  const [isBackdrop, setIsBackdrop] = useState<boolean>(false);
  const bottom = useRef<number>(0);
  const snapPoints = useRef<string[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const modalHandler = useRef<ModalHandlerEvent>({
    onAnimated: () => {},
    onEnd: () => {},
  });

  const opacity = useSharedValue(0);

  const presentModalHandler = useCallback((options: ModalOptionsType) => {
    snapPoints.current = options.snapPoints;
    setIsBackdrop(options.backdrop ? options.backdrop : false);
    bottom.current = options.bottom ? options.bottom : 0;
    setComponent(options.component);
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModalHandler = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const useAnimatedModalHandler = (options: ModalHandlerEvent) => {
    modalHandler.current.onAnimated = options.onAnimated;
    modalHandler.current.onEnd = options.onEnd;
  };

  const BackdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const Backdrop = () => {
    return isBackdrop ? (
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
          },
          BackdropAnimatedStyle,
        ]}
      />
    ) : null;
  };

  const memo = useMemo<BottomSheetProps>(
    () => ({ presentModalHandler, closeModalHandler, useAnimatedModalHandler }),
    []
  );

  return (
    <BottomSheetContext.Provider value={memo}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 1,
          }}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints.current}
          backdropComponent={Backdrop}
          enablePanDownToClose
          bottomInset={bottom.current}
          onAnimate={(from, to) => {
            if (modalHandler.current.onAnimated) {
              modalHandler.current.onAnimated(from, to);
            }
            if (to === 0) {
              opacity.value = withTiming(0.5);
            } else if (to === -1) {
              opacity.value = withTiming(0);
            }
          }}
          onDismiss={modalHandler.current.onEnd}
        >
          {component}
        </BottomSheetModal>
        {children}
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};
