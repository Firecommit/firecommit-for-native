import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { AuthContext } from '../contexts/AuthProvider';

export const MapScreen = () => {
  const { signout, currentUser } = useContext(AuthContext);
  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    >
      <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{ uri: `http://localhost:3000` }}
      />
    </View>
  );
};
