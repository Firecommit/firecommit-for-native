import React, { createContext, FC, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AsyncDataProps = {
  '@remember'?: string;
  '@name'?: string;
  '@email'?: string;
  '@password'?: string;
  '@server'?: string;
  '@code'?: string;
};

type StorageDataOptions = {
  mode: 'set' | 'merge' | 'remove' | 'clear';
  attributes?: {
    key: string;
    val?: string;
  };
};

type AsyncStorageProps = {
  storageData: (option?: StorageDataOptions) => void;
  storage?: AsyncDataProps;
};

export const AsyncStorageContext = createContext<AsyncStorageProps>({
  storageData: () => {},
  storage: undefined,
});

export const AsyncStorageProvider: FC = ({ children }) => {
  const [storage, setStorage] = useState<AsyncDataProps>();

  const storageData = (option?: StorageDataOptions) => {
    if (option) {
      if (option.mode === 'set' && option.attributes && option.attributes.val) {
        AsyncStorage.setItem(option.attributes.key, option.attributes.val);
      } else if (
        option.mode === 'merge' &&
        option.attributes &&
        option.attributes.val
      ) {
        AsyncStorage.mergeItem(option.attributes.key, option.attributes.val);
      } else if (option.mode === 'remove' && option.attributes) {
        AsyncStorage.removeItem(option.attributes.key);
      } else if (option.mode === 'clear') {
        AsyncStorage.clear();
      }
    }
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((items) =>
        setStorage(Object.fromEntries(items))
      );
    });
  };

  useEffect(() => {
    storageData();
  }, []);

  return (
    <AsyncStorageContext.Provider value={{ storageData, storage }}>
      {storage !== undefined ? children : <></>}
    </AsyncStorageContext.Provider>
  );
};
