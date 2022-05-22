import React, {useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {Image, View} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useAuth} from '&/lib/auth';
import {useUpdate} from '&/lib/firebase';

export const PictureForm = () => {
  const [image, setImage] = useState<Asset>();
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const update = useUpdate();
  const theme = useTheme();

  return (
    <View style={{padding: 32}}>
      {image && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 64,
          }}>
          <Image
            source={{uri: image.uri}}
            style={{
              width: 128,
              height: 128,
              borderRadius: 1000,
            }}
          />
        </View>
      )}
      <Button
        style={{marginBottom: 32}}
        mode="contained"
        color={theme.colors.primary}
        dark
        onPress={async () => {
          const lib = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 256,
            maxHeight: 256,
          });
          setImage(lib.assets?.[0]);
        }}>
        アップロード
      </Button>
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!image}
        onPress={() => {
          setLoading(true);
          if (user) {
            update.picture({user, value: `${image?.uri}`}).then(() => {
              setTimeout(() => setLoading(false), 1000);
            });
          }
        }}>
        保存
      </Button>
    </View>
  );
};
