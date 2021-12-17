import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AsyncStorageContext } from './AsyncStorageProvider';
import { db } from '../../firebase';

type DataProps = {
  adminUserId: string;
  inAudit: boolean;
  members: { [key: string]: boolean };
  name: string;
};

type ServerProps = {
  data?: DataProps;
  LoginServer: (code: string) => void;
  isLogin: boolean;
  LogoutServer: () => void;
};

export const ServerContext = createContext<ServerProps>({
  data: undefined,
  LoginServer: (code: string) => {},
  isLogin: false,
  LogoutServer: () => {},
});

export const ServerProvider: FC = ({ children }) => {
  const [data, setData] = useState<DataProps>();
  const { storage, storageData } = useContext(AsyncStorageContext);
  const [isLogin, setIsLogin] = useState(storage?.['@server'] === 'true');

  const LoginServer = (code: string) => {
    db.ref(`workspace/${code}`).on('value', (snapshot) => {
      setData(snapshot.val());
      storageData({
        mode: 'set',
        attributes: { key: '@server', val: 'true' },
      });
      storageData({
        mode: 'set',
        attributes: { key: '@code', val: code },
      });
      setIsLogin(true);
    });
  };

  const LogoutServer = () => {
    storageData({
      mode: 'set',
      attributes: { key: '@server', val: 'false' },
    });
    storageData({ mode: 'remove', attributes: { key: '@code' } });
    setIsLogin(false);
  };

  useEffect(() => {
    if (storage?.['@server'] === 'true') {
      LoginServer(`${storage['@code']}`);
    }
  }, []);

  useEffect(() => {
    setIsLogin(storage?.['@server'] === 'true');
  }, [storage]);

  return (
    <ServerContext.Provider
      value={{ data, LoginServer, isLogin, LogoutServer }}
    >
      {children}
    </ServerContext.Provider>
  );
};
