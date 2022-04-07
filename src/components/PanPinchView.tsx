import React, { ReactNode, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PanContextType = {
  translateX: number;
  translateY: number;
};

type PanPinchViewProps = {
  children: ReactNode;
  onTracking?: () => {
    panX: number;
    panY: number;
  };
  onPanStart?: () => void;
  onPanMove?: () => void;
  onPinchStart?: () => void;
  onPinchMove?: () => void;
};

export const PanPinchView = ({
  children,
  onTracking,
  onPanStart,
  onPanMove,
  onPinchStart,
  onPinchMove,
}: PanPinchViewProps) => {
  const window = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const panStartEvent = useSharedValue<Readonly<
    GestureEventPayload & PanGestureHandlerEventPayload
  > | null>(null);
  const pinchStartEvent = useSharedValue<Readonly<
    GestureEventPayload & PinchGestureHandlerEventPayload
  > | null>(null);

  useEffect(() => {
    if (onTracking) {
      translateX.value = withTiming(onTracking().panX);
      translateY.value = withTiming(onTracking().panY);
      focalX.value = window.width / 2;
      focalY.value = window.height / 2;
    }
  }, [onTracking]);

  useEffect(() => {
    if (onPanStart) onPanStart();
  }, [panStartEvent.value]);

  useEffect(() => {
    if (onPanMove) onPanMove();
  }, [translateX.value, translateY.value]);

  useEffect(() => {
    if (onPinchStart) onPinchStart();
  }, [pinchStartEvent.value]);

  useEffect(() => {
    if (onPinchMove) onPinchMove();
  }, [scale.value]);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      panStartEvent.value = event;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const pinchGestureEvent =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onStart: (event) => {
        pinchStartEvent.value = event;
      },
      onActive: (event) => {
        scale.value = savedScale.value * event.scale;
        if (onTracking) {
          focalX.value = window.width / 2;
          focalY.value = window.height / 2;
        } else {
          focalX.value = event.focalX;
          focalY.value = event.focalY;
        }
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
                  left: window.width / 2 - 4096 / 2,
                  top: window.height / 2 - 4096 / 2,
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
