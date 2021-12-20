import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AsyncStorageContext } from './AsyncStorageProvider';
import { db } from '../../firebase';
import { AuthContext } from './AuthProvider';

type DataProps = {
  id: string;
  adminUserId: string;
  inAudit: boolean;
  members: { [key: string]: boolean };
  name: string;
};

type ServerProps = {
  data?: DataProps;
  isLogin: boolean;
  LoginServer: (code: string) => void;
  LogoutServer: () => void;
  getServerName: (code: string) => string | undefined;
};

export const ServerContext = createContext<ServerProps>({
  data: undefined,
  isLogin: false,
  LoginServer: (code: string) => {},
  LogoutServer: () => {},
  getServerName: (code: string) => '',
});

export const ServerProvider: FC = ({ children }) => {
  const [data, setData] = useState<DataProps>();
  const { storage, storageData } = useContext(AsyncStorageContext);
  const [isLogin, setIsLogin] = useState(storage?.['@server'] === 'true');
  const { currentUser } = useContext(AuthContext);

  const getServerName = (code: string) => {
    let name;
    db.ref(`workspace/${code}`).on('value', (snapshot) => {
      name = snapshot.val().name;
    });
    return name;
  };

  const LoginServer = (code: string) => {
    const usersWrokspaceRef = db
      .ref(`users/${currentUser?.auth?.uid}`)
      .child('workspace');

    let updateData = {};
    usersWrokspaceRef.on('value', (snapshot) => {
      updateData = Object.fromEntries(
        Object.keys({ ...snapshot.val(), [code]: true }).map((key) =>
          key === code ? [key, true] : [key, false]
        )
      );
    });
    usersWrokspaceRef.update(updateData);

    db.ref(`workspace/${code}`)
      .child('members')
      .update({
        [`${currentUser?.auth?.uid}`]: true,
      });

    db.ref(`workspace/${code}`).on('value', (snapshot) => {
      setData({ ...snapshot.val(), id: code });
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
      value={{ data, isLogin, LoginServer, LogoutServer, getServerName }}
    >
      {children}
    </ServerContext.Provider>
  );
};
