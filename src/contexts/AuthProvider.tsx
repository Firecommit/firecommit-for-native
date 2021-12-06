import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase, { auth } from '../../firebase';
import { AsyncStorageContext } from './AsyncStorageProvider';

type UserProps = firebase.User | null | undefined;

type AuthContextProps = {
  currentUser: UserProps;
  isSignedIn: boolean;
  signin: (email: string, password: string) => void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  isSignedIn: false,
  signin: (email = '', password = '') => {},
  signout: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const { storageData, storage } = useContext(AsyncStorageContext);
  const [isSignedIn, setIsSignedIn] = useState(storage['@remember'] === 'true');

  const signin = (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        storageData({
          mode: 'set',
          attributes: { key: '@remember', val: 'true' },
        });
        storageData({ mode: 'set', attributes: { key: '@email', val: email } });
        storageData({
          mode: 'set',
          attributes: { key: '@password', val: password },
        });
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signout = () => {
    auth.signOut().then(() => {
      storageData({ mode: 'remove', attributes: { key: '@email' } });
      storageData({ mode: 'remove', attributes: { key: '@password' } });
      storageData({
        mode: 'set',
        attributes: { key: '@remember', val: 'false' },
      });
      setIsSignedIn(false);
    });
  };

  useEffect(() => {
    if (storage['@remember']) {
      if (storage['@email'] && storage['@password']) {
        signin(storage['@email'], storage['@password']);
      }
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isSignedIn,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
