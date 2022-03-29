import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { IndoorMapView } from '../components/IndoorMapView';
import { useAttitude } from '../hooks/useAttitude';
import { useHeading } from '../hooks/useHeading';
import { useSensorListener } from '../hooks/useSensorListener';

export const MapScreen = () => {
  const [attitude, setAttitudeSensors] = useAttitude();
  const [ref, state, setHeadingSensors] = useHeading(attitude);

  useSensorListener(
    'fusion',
    ([acc, mag, gyr]) => {
      setAttitudeSensors({ acc, mag });
      setHeadingSensors({ acc, mag, gyr }, 1000);
    },
    1000
  );

  const deg = (ang: number): number => {
    return ang ? Number(((ang * 180) / Math.PI).toFixed(4)) : 0;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 10,
          width: 200,
          height: 200,
        }}
      >
        <Text style={{ fontSize: 14 }}>headingMag: {deg(state.mag)}</Text>
        <Text style={{ fontSize: 14 }}>headingGyr: {deg(state.gyr)}</Text>
        <Text style={{ fontSize: 14 }}>heading: {deg(state.origin)}</Text>
      </View>
      <IndoorMapView />
    </View>
  );
};
