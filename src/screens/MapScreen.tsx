import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

export const MapScreen = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

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
      <WebView
        originWhitelist={['*']}
        // scrollEnabled={false}
        source={{ uri: `https://www.youtube.com/` }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};
