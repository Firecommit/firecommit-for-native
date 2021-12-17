import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase, { auth, db } from '../../firebase';
import { AsyncStorageContext } from './AsyncStorageProvider';
import { ServerContext } from './ServerProvider';

type UserProps = firebase.User | null | undefined;

type AuthContextProps = {
  currentUser: UserProps;
  isSignedIn: boolean;
  signup: (name: string, email: string, password: string) => void;
  signin: (email: string, password: string) => void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  isSignedIn: false,
  signup: (name = '', email = '', password = '') => {},
  signin: (email = '', password = '') => {},
  signout: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const { storageData, storage } = useContext(AsyncStorageContext);
  const [isSignedIn, setIsSignedIn] = useState(
    storage?.['@remember'] === 'true'
  );

  const signup = (name: string, email: string, password: string) => {
    const data = {
      coordinate: {
        x: 0,
        y: 0,
      },
    };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        user?.updateProfile({
          displayName: name,
        });
        db.ref(`users/${user?.uid}`)
          .set(data)
          .catch((error) => {
            throw error;
          });
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
        throw error;
      });
  };

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
        throw error;
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
    if (storage) {
      if (storage['@remember'] === 'true') {
        if (storage['@email'] && storage['@password']) {
          signin(storage['@email'], storage['@password']);
        }
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
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
