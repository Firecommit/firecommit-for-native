import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase, { auth, db } from '../../firebase';
import { AsyncStorageContext } from './AsyncStorageProvider';

type UserProps = {
  auth?: firebase.User | null;
  data?: {
    coordinate: {
      x: number;
      y: number;
    };
    workspace: {
      [key: string]: boolean;
    };
  };
};

type AuthContextProps = {
  currentUser: UserProps;
  isSignedIn: boolean;
  signup: (name: string, email: string, password: string) => void;
  signin: (email: string, password: string) => void;
  signout: () => void;
  update: (type: 'name' | 'email' | 'password', val: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: { auth: undefined, data: undefined },
  isSignedIn: false,
  signup: (name = '', email = '', password = '') => {},
  signin: (email = '', password = '') => {},
  signout: () => {},
  update: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProps>({
    auth: undefined,
    data: undefined,
  });
  const { storageData, storage } = useContext(AsyncStorageContext);
  const [isSignedIn, setIsSignedIn] = useState(
    storage?.['@remember'] === 'true'
  );

  const update = async (type: 'name' | 'email' | 'password', val: string) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      `${storage?.['@email']}`,
      `${storage?.['@password']}`
    );
    auth.currentUser?.reauthenticateWithCredential(credential).then(() => {
      switch (type) {
        case 'name':
          auth.currentUser?.updateProfile({ displayName: val });
          break;
        case 'email':
          auth.currentUser?.updateEmail(val);
          storageData({
            mode: 'set',
            attributes: { key: '@email', val },
          });
          break;
        case 'password':
          auth.currentUser?.updatePassword(val);
          storageData({
            mode: 'set',
            attributes: { key: '@password', val },
          });
          break;
        default:
          break;
      }
    });
  };

  const signup = (name: string, email: string, password: string) => {
    const data = {
      coordinate: {
        x: 0,
        y: 0,
      },
      workspace: {},
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
      .then((userCredential) => {
        const { user } = userCredential;
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

        db.ref(`users/${user?.uid}`).on('value', (snapshot) => {
          setCurrentUser({ auth: user, data: snapshot.val() });
        });
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isSignedIn,
        signup,
        signin,
        signout,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
