import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppState } from 'react-native';
import firebase, { auth, db, storage as firestorage } from '../../firebase';
import { ErrorProps } from '../types';
import { AsyncStorageContext } from './AsyncStorageProvider';
import { DialogContext } from './DialogProvider';

type UserProps = {
  auth?: firebase.User | null;
  data?: {
    email: string;
    name: string;
    photoURL: string;
    state: 'online' | 'offline';
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
    type: 'picture' | 'name' | 'email' | 'password' | 'location' | 'state',
    val: any
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
    type: 'picture' | 'name' | 'email' | 'password' | 'location' | 'state',
    val: any
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
                  db.ref('users').child(user.uid).update({ photoURL: val });
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
                  db.ref('users').child(user.uid).update({ name: val });
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
                db.ref('users').child(user.uid).update({ email: val });
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
          case 'location':
            db.ref('users').child(user.uid).update({ coordinate: val });
            break;
          case 'state':
            db.ref('users').child(user.uid).update({ state: val });
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
      name,
      email,
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/firecommit-1e1d5.appspot.com/o/users%2Ficon%2Fdefault_user.png?alt=media&token=8f30cf5a-db74-4a09-b4e6-ec26670ba538',
      state: 'online',
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
          photoURL: data.photoURL,
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
        setCurrentUser({
          auth: user,
          data: { ...data, state: 'online', workspace: {} },
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
        update('state', 'online');
      })
      .catch((res) => {
        displayError({ msg: res.message });
        signout();
      });
  };

  const signout = () => {
    storageData({ mode: 'clear' });
    auth
      .signOut()
      .then(() => {
        update('state', 'offline');
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
    AppState.addEventListener('change', (state) => {
      if (state === 'inactive') update('state', 'offline');
      if (['active', 'background'].includes(state)) update('state', 'online');
    });
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
