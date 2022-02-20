import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { useAttitude } from '../hooks/useAttitude';
import { useHeading } from '../hooks/useHeading';
import { useSensorListener } from '../hooks/useSensorListener';

export const MapScreen = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [attitude, setAttitudeSensors] = useAttitude();
  const [ref, state, setHeadingSensors] = useHeading(attitude);

  useSensorListener(
    'fusion',
    ([acc, mag, gyr]) => {
      setAttitudeSensors({ acc, mag });
      setHeadingSensors({ acc, mag, gyr }, 100);
    },
    100
  );

  const deg = (ang: number): number => {
    return ang ? Number(((ang * 180) / Math.PI).toFixed(4)) : 0;
  };

  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height - 150,
      }}
    >
      {loading ? (
        <ActivityIndicator
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 1000,
          }}
          animating
          color={theme.colors.primary}
        />
      ) : null}
      <View style={{ position: 'absolute', zIndex: 1000 }}>
        <Text style={{ fontSize: 14 }}>headingMag: {deg(state.mag)}</Text>
        <Text style={{ fontSize: 14 }}>headingGyr: {deg(state.gyr)}</Text>
        <Text style={{ fontSize: 14 }}>heading: {deg(state.origin)}</Text>
      </View>
      <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{ uri: `http://localhost:3000` }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};
