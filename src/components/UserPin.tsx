import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type UserPinProps = {
  color: string;
  position: {
    x: number;
    y: number;
  };
  heading?: number;
  onPress?: () => void;
  onMove?: () => void;
};

export const UserPin = ({
  color,
  position,
  heading,
  onPress,
  onMove,
}: UserPinProps) => {
  const borderAnimation = useSharedValue(1);
  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const rotate = useSharedValue(0);

  const positionAnimatedStyle = useAnimatedStyle(() => ({
    left: left.value,
    top: top.value,
  }));

  const userPinAnimatedStyle = useAnimatedStyle(() => ({
    borderWidth: borderAnimation.value,
  }));

  const userHeadingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${Number(((rotate.value * 180) / Math.PI).toFixed(4))}deg` },
    ],
  }));

  useEffect(() => {
    left.value = withTiming(position.x);
    top.value = withTiming(position.y);
    if (onMove) onMove();
  }, [position]);

  useEffect(() => {
    rotate.value = heading ? heading + (90 * Math.PI) / 180 : 0;
  }, [heading]);

  useEffect(() => {
    borderAnimation.value = withRepeat(
      withTiming(2.5, { duration: 1000 }),
      -1,
      true
    );
  }, [borderAnimation]);

  const styles = StyleSheet.create({
    shadow: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1,
      elevation: 1,
    },
    wrapper: {
      width: 0,
      height: 0,
    },
    userpin: {
      backgroundColor: color,
      borderRadius: 50,
      borderWidth: 1.5,
      borderColor: 'white',
      width: 12,
      height: 12,
    },
    direction: {
      left: -24,
      top: -35,
      zIndex: -1,
      width: 0,
      height: 0,
      borderWidth: 30,
      borderColor: 'transparent',
      borderTopWidth: 30,
      borderTopColor: 'rgba(255, 0, 0, 0.3)',
      borderRadius: 100,
    },
  });

  return (
    <Animated.View
      onTouchStart={onPress}
      style={[
        StyleSheet.absoluteFillObject,
        styles.wrapper,
        positionAnimatedStyle,
      ]}
    >
      <Animated.View
        style={[styles.shadow, styles.userpin, userPinAnimatedStyle]}
      />
      {heading ? (
        <Animated.View style={[styles.direction, userHeadingAnimatedStyle]} />
      ) : null}
    </Animated.View>
  );
};
