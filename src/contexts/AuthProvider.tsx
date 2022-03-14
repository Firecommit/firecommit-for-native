import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase, { auth, db } from '../../firebase';
import { ErrorProps } from '../types';
import { AsyncStorageContext } from './AsyncStorageProvider';
import { DialogContext } from './DialogProvider';

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
  update: (
    type: 'picture' | 'name' | 'email' | 'password',
    val: string
  ) => Promise<void>;
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
  const { displayError } = useContext(DialogContext);
  const [isSignedIn, setIsSignedIn] = useState(
    storage?.['@remember'] === 'true'
  );

  const update = async (
    type: 'picture' | 'name' | 'email' | 'password',
    val: string
  ) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        switch (type) {
          case 'picture':
            if (val.length) {
              user
                .updateProfile({ photoURL: val })
                .then(() => {
                  setCurrentUser((u) => ({
                    ...u,
                    auth: auth.currentUser,
                  }));
                })
                .catch((res) => displayError({ msg: res.message }));
            } else {
              displayError({ msg: '画像をアップロードしてください' });
            }
            break;
          case 'name':
            if (val.length) {
              user
                .updateProfile({ displayName: val })
                .then(() => {
                  setCurrentUser((u) => ({
                    ...u,
                    auth: auth.currentUser,
                  }));
                })
                .catch((res) => displayError({ msg: res.message }));
            } else {
              displayError({ msg: '氏名を入力してください' });
            }
            break;
          case 'email':
            user
              ?.updateEmail(val)
              .then(() => {
                setCurrentUser((u) => ({
                  ...u,
                  auth: auth.currentUser,
                }));
                storageData({
                  mode: 'set',
                  attributes: { key: '@email', val },
                });
              })
              .catch((res) => displayError({ msg: res.message }));
            break;
          case 'password':
            user
              ?.updatePassword(val)
              .then(() => {
                setCurrentUser((u) => ({
                  ...u,
                  auth: auth.currentUser,
                }));
                storageData({
                  mode: 'set',
                  attributes: { key: '@password', val },
                });
              })
              .catch((res) => displayError({ msg: res.message }));
            break;
          default:
            break;
        }
      }
    });
  };

  const signup = (name: string, email: string, password: string) => {
    const error: ErrorProps = {
      msg: !name.length ? '- 氏名を入力してください' : '',
    };
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
          .catch((res) => {
            error.msg += `${error ? '\n' : ''}- ${res.message}`;
            displayError(error);
          });
        storageData({
          mode: 'set',
          attributes: { key: '@remember', val: 'true' },
        });
        storageData({
          mode: 'set',
          attributes: { key: '@email', val: email },
        });
        storageData({
          mode: 'set',
          attributes: { key: '@password', val: password },
        });
        setIsSignedIn(true);
      })
      .catch((res) => {
        error.msg += `${error ? '\n' : ''}- ${res.message}`;
        displayError(error);
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
      .catch((res) => {
        displayError({ msg: res.message });
      });
  };

  const signout = () => {
    auth
      .signOut()
      .then(() => {
        storageData({ mode: 'remove', attributes: { key: '@email' } });
        storageData({ mode: 'remove', attributes: { key: '@password' } });
        storageData({
          mode: 'set',
          attributes: { key: '@remember', val: 'false' },
        });
        setIsSignedIn(false);
      })
      .catch((res) => {
        displayError({ msg: res.message });
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
