import AsyncStorage from '@react-native-async-storage/async-storage';

const storagePrefix = 'firecommit_';

const storage = {
  getToken: async () => {
    return JSON.parse(
      (await AsyncStorage.getItem(`${storagePrefix}token`)) as string,
    );
  },
  setToken: (token: string) => {
    AsyncStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    AsyncStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
