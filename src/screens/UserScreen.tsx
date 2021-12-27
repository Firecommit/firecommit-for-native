import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, List, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthProvider';
import { DialogContext } from '../contexts/DialogProvider';

export const UserScreen = () => {
  const { currentUser, update } = useContext(AuthContext);
  const { displayError, showDialog } = useContext(DialogContext);
  const [name, setName] = useState<string>(`${currentUser.auth?.displayName}`);
  const [email, setEmail] = useState<string>(`${currentUser.auth?.email}`);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState({
    name: false,
    email: false,
    password: false,
  });

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>アカウント</List.Subheader>
        <View style={{ backgroundColor: '#fff' }}>
          <List.Accordion
            title="ユーザー名設定"
            style={{
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{
                padding: 16,
                borderBottomWidth: 3,
                borderColor: '#eee',
              }}
            >
              <TextInput
                label="氏名"
                mode="flat"
                value={name}
                autoCapitalize="none"
                onChangeText={(text) => setName(text)}
                style={{ marginBottom: 16 }}
              />
              <Button
                mode="contained"
                loading={loading.name}
                onPress={() => {
                  setLoading((l) => ({ ...l, name: true }));
                  update('name', name)
                    .then(() => {
                      setTimeout(
                        () => setLoading((l) => ({ ...l, name: false })),
                        1000
                      );
                    })
                    .catch((error) => {
                      displayError(error);
                      showDialog();
                    });
                }}
              >
                更新
              </Button>
            </View>
          </List.Accordion>
          <List.Accordion
            title="メールアドレス設定"
            style={{
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{
                padding: 16,
                borderBottomWidth: 3,
                borderColor: '#eee',
              }}
            >
              <TextInput
                label="メールアドレス"
                mode="flat"
                value={email}
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                style={{ marginBottom: 16 }}
              />
              <Button
                mode="contained"
                loading={loading.email}
                onPress={() => {
                  setLoading((l) => ({ ...l, email: true }));
                  update('email', email)
                    .then(() => {
                      setTimeout(
                        () => setLoading((l) => ({ ...l, email: false })),
                        1000
                      );
                    })
                    .catch((error) => {
                      displayError(error);
                      showDialog();
                    });
                }}
              >
                更新
              </Button>
            </View>
          </List.Accordion>
          <List.Accordion
            title="パスワード設定"
            style={{
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{
                padding: 16,
                borderBottomWidth: 3,
                borderColor: '#eee',
              }}
            >
              <TextInput
                label="パスワード"
                mode="flat"
                value={password}
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
                style={{ marginBottom: 16 }}
                secureTextEntry
              />
              <Button
                mode="contained"
                loading={loading.password}
                onPress={() => {
                  setLoading((l) => ({ ...l, password: true }));
                  update('password', password)
                    .then(() => {
                      setTimeout(
                        () => setLoading((l) => ({ ...l, password: false })),
                        1000
                      );
                    })
                    .catch((error) => {
                      displayError(error);
                      showDialog();
                    });
                }}
              >
                更新
              </Button>
            </View>
          </List.Accordion>
        </View>
      </List.Section>
    </ScrollView>
  );
};
