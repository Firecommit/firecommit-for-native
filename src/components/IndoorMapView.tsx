import React, { FC } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type PanContextType = {
  translateX: number;
  translateY: number;
};

const SampleImageRef = Image.resolveAssetSource(
  require('../../assets/sample.jpg')
);

export const IndoorMapView: FC = ({ children }) => {
  const theme = useTheme();
  const window = useWindowDimensions();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const rotate = useSharedValue(0);

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
            },
            PinchHandlerStyle,
          ]}
        >
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  left: -SampleImageRef.width / 2,
                  top: -window.height / 2,
                  width: SampleImageRef.width,
                  height: SampleImageRef.height,
                },
                PanHandlerStyle,
              ]}
            >
              <Image
                resizeMode="center"
                style={{ flex: 1 }}
                source={{ uri: SampleImageRef.uri }}
              />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};
