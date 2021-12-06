import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AsyncDataProps = {
  '@remember'?: string;
  '@email'?: string;
  '@password'?: string;
};

type StorageDataOptions = {
  mode: 'set' | 'merge' | 'get_all' | 'remove' | 'clear';
  attributes?: {
    key: string;
    val?: string;
  };
};

type AsyncStorageProps = {
  storageData: (
    option: StorageDataOptions
  ) => Promise<AsyncDataProps | undefined>;
  storage: AsyncDataProps;
};

const storageData = async (option: StorageDataOptions) => {
  try {
    if (option.mode === 'set' && option.attributes && option.attributes.val) {
      await AsyncStorage.setItem(option.attributes.key, option.attributes.val);
    } else if (
      option.mode === 'merge' &&
      option.attributes &&
      option.attributes.val
    ) {
      await AsyncStorage.mergeItem(
        option.attributes.key,
        option.attributes.val
      );
    } else if (option.mode === 'get_all') {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      return Object.fromEntries(items);
    } else if (option.mode === 'remove' && option.attributes) {
      await AsyncStorage.removeItem(option.attributes.key);
    } else if (option.mode === 'clear') {
      await AsyncStorage.clear();
    }
    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const AsyncStorageContext = createContext<AsyncStorageProps>({
  storageData,
  storage: {},
});

export const AsyncStorageProvider: FC = ({ children }) => {
  const [storage, setStorage] = useState<AsyncDataProps>({});

  useEffect(() => {
    storageData({ mode: 'get_all' }).then((data) => {
      if (data) {
        setStorage(data);
      }
    });
  }, []);

  return (
    <AsyncStorageContext.Provider value={{ storageData, storage }}>
      {Object.keys(storage).length ? children : <></>}
    </AsyncStorageContext.Provider>
  );
};
