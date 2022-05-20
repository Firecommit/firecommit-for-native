import AsyncStorage from '@react-native-async-storage/async-storage';
import {SigninCredentialsDTO} from '&/features/auth';
import {WorkspaceCredentialsDTO} from '&/features/ver';

export type AsyncStorageDTO = SigninCredentialsDTO & WorkspaceCredentialsDTO;

const storagePrefix = 'firecommit_';

const storage = {
  getToken: async () => {
    const tmp = (await AsyncStorage.getItem(`${storagePrefix}token`)) as string;
    const res = JSON.parse(tmp) as AsyncStorageDTO;
    return res;
  },
  setToken: (token: AsyncStorageDTO) => {
    AsyncStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    AsyncStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
