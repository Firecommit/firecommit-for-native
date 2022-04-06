import React, { useEffect, useState } from 'react';
import {
  Image as RNImage,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { PanPinchView } from '../components/PanPinchView';
import SampleImage from '../components/assets/sample.jpg';
import { UserPin } from '../components/UserPin';
import { useAttitude } from '../hooks/useAttitude';
import { useHeading } from '../hooks/useHeading';
import { useSensorListener } from '../hooks/useSensorListener';
import { useStep } from '../hooks/useStep';
import { BadgeButton } from '../components/BadgeButton';

export const MapScreen = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPos, setIsPos] = useState(false);
  const [isCurrentPos, setIsCurrentPos] = useState(false);

  const theme = useTheme();
  const window = useWindowDimensions();
  const RNImageRef = RNImage.resolveAssetSource(SampleImage);
  const [attitude, setAttitudeSensors] = useAttitude();
  const [ref, heading, setHeadingSensors] = useHeading(attitude);
  const [step, setStepSensor] = useStep(attitude);

  const panX = -(position.x - RNImageRef.width / 6 - window.width / 2);
  const panY = -(position.y - RNImageRef.height / 6);

  useSensorListener(
    'fusion',
    ([acc, mag, gyr]) => {
      setAttitudeSensors({ acc, mag });
      setStepSensor({ acc });
      setHeadingSensors({ acc, mag, gyr }, 100);
    },
    100
  );

  const { length } = step;
  useEffect(() => {
    setPosition((pos) => {
      const sx = length * Math.cos(heading.origin) * 10;
      const sy = length * Math.sin(heading.origin) * 10;
      return { x: pos.x + sx, y: pos.y + sy };
    });
  }, [step]);

  const styles = StyleSheet.create({
    wrapper: {
      width: RNImageRef.width / 3,
      height: RNImageRef.height / 3,
      position: 'relative',
    },
    center: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  });

  return (
    <>
      <PanPinchView
        onTracking={isCurrentPos ? () => ({ panX, panY }) : undefined}
        onPanStart={() => {
          setIsCurrentPos(false);
        }}
      >
        <View
          style={[styles.wrapper, styles.center]}
          onTouchStart={(e) => {
            const { locationX, locationY, target } = e.nativeEvent;
            if (Number(target) === 19 && isPos) {
              setPosition({ x: locationX, y: locationY });
              setIsPos(false);
            }
          }}
        >
          <RNImage
            style={{ width: '100%', height: '100%' }}
            source={{ uri: RNImageRef.uri }}
          />
          <UserPin
            color={theme.colors.primary}
            position={position}
            heading={heading.origin}
          />
          <UserPin color={theme.colors.accent} position={{ x: 100, y: 100 }} />
          <UserPin color={theme.colors.accent} position={{ x: 120, y: 50 }} />
          <UserPin color={theme.colors.accent} position={{ x: 300, y: 100 }} />
          <UserPin color={theme.colors.accent} position={{ x: 100, y: 200 }} />
        </View>
      </PanPinchView>
      <View style={[StyleSheet.absoluteFillObject, { left: 320, top: 500 }]}>
        <BadgeButton
          icon="near-me"
          color={isCurrentPos ? theme.colors.primary : '#999'}
          onPress={() => {
            setIsCurrentPos(true);
          }}
        />
        <BadgeButton
          style={{ marginTop: 15 }}
          icon={isPos ? 'gps-fixed' : 'gps-not-fixed'}
          dark
          color={theme.colors.primary}
          onPress={() => {
            setIsPos(true);
          }}
        />
      </View>
    </>
  );
};
