import React, { FC } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type PanContextType = {
  translateX: number;
  translateY: number;
};

export const PanPinchView: FC = ({ children }) => {
  const window = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const pinchGestureEvent =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = savedScale.value * event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
        if (scale.value < 1) {
          scale.value = 1;
        }
      },
      onEnd: () => {
        savedScale.value = scale.value;
      },
    });

  const PanHandlerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const PinchHandlerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -window.width / 2 },
      { translateY: -window.height / 2 },
      { perspective: 200 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: window.width / 2 },
      { translateY: window.height / 2 },
    ],
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PinchGestureHandler onGestureEvent={pinchGestureEvent}>
        <Animated.View
          style={[
            {
              width: window.width,
              height: window.height,
              position: 'relative',
            },
            PinchHandlerStyle,
          ]}
        >
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  width: 4096,
                  height: 4096,
                  left: -4096 / 2,
                  top: 100 + 320 - 4096 / 2,
                },
                PanHandlerStyle,
              ]}
            >
              {children}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};
