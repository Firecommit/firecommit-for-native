import React, { FC, useContext, useState } from 'react';
import { Image, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../contexts/AuthProvider';
import { storage } from '../../firebase';

export const AccountPictureUpdateScreen: FC = () => {
  const [image, setImage] = useState<Asset>();
  const [loading, setLoading] = useState(false);
  const { update, currentUser } = useContext(AuthContext);

  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 32,
      }}
    >
      {image ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 64,
          }}
        >
          <Image
            source={{ uri: image.uri }}
            style={{
              width: 128,
              height: 128,
              borderRadius: 1000,
            }}
          />
        </View>
      ) : null}
      <Button
        style={{ marginBottom: 32 }}
        mode="contained"
        color={theme.colors.primary}
        dark
        onPress={() => {
          launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 256,
            maxHeight: 256,
          }).then((value) => {
            setImage(value.assets?.[0]);
          });
        }}
      >
        アップロード
      </Button>
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!image}
        onPress={async () => {
          setLoading(true);
          const blob = await fetch(`${image?.uri}`).then((res) => res.blob());
          storage
            .ref(`users/icon/${currentUser.auth?.uid}.png`)
            .put(blob)
            .then((snapshot) => {
              snapshot.ref.getDownloadURL().then((url) => {
                update('picture', `${url}`).then(() => {
                  setTimeout(() => setLoading(false), 1000);
                });
              });
            });
        }}
      >
        保存
      </Button>
    </View>
  );
};

export const AccountNameUpdateScreen: FC = () => {
  const { currentUser, update } = useContext(AuthContext);
  const [name, setName] = useState<string>(`${currentUser.auth?.displayName}`);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 32,
      }}
    >
      <TextInput
        label="氏名"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={name}
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
        style={{ marginBottom: 32, backgroundColor: '#fff' }}
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!name.length}
        onPress={() => {
          setLoading(true);
          update('name', name).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};

export const AccountEmailUpdateScreen: FC = () => {
  const { currentUser, update } = useContext(AuthContext);
  const [email, setEmail] = useState<string>(`${currentUser.auth?.email}`);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 32,
      }}
    >
      <TextInput
        label="メールアドレス"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        style={{ marginBottom: 32, backgroundColor: '#fff' }}
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!email.length}
        onPress={() => {
          setLoading(true);
          update('email', email).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};

export const AccountPasswordUpdateScreen: FC = () => {
  const { update } = useContext(AuthContext);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        height: '100%',
        padding: 32,
        backgroundColor: '#fff',
      }}
    >
      <TextInput
        label="パスワード"
        mode="outlined"
        activeOutlineColor={theme.colors.accent}
        value={password}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        style={{ marginBottom: 32, backgroundColor: '#fff' }}
        secureTextEntry
      />
      <Button
        mode="contained"
        color={theme.colors.accent}
        loading={loading}
        dark
        disabled={!password.length}
        onPress={() => {
          setLoading(true);
          update('password', password).then(() => {
            setTimeout(() => setLoading(false), 1000);
          });
        }}
      >
        保存
      </Button>
    </View>
  );
};
