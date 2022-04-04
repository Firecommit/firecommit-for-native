import React, { useEffect, useState } from 'react';
import { Image as RNImage, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { PanPinchView } from '../components/PanPinchView';
import SampleImage from '../components/assets/sample.jpg';
import { UserPin } from '../components/UserPin';
import { useAttitude } from '../hooks/useAttitude';
import { useHeading } from '../hooks/useHeading';
import { useSensorListener } from '../hooks/useSensorListener';
import { useStep } from '../hooks/useStep';

export const MapScreen = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const theme = useTheme();
  const RNImageRef = RNImage.resolveAssetSource(SampleImage);
  const [attitude, setAttitudeSensors] = useAttitude();
  const [ref, heading, setHeadingSensors] = useHeading(attitude);
  const [step, setStepSensor] = useStep(attitude);

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
    <PanPinchView>
      <View
        style={[styles.wrapper, styles.center]}
        onTouchStart={(e) => {
          const { locationX, locationY, target } = e.nativeEvent;
          if (Number(target) === 19) {
            setPosition({ x: locationX, y: locationY });
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
  );
};
