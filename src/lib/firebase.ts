import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DB_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MSG_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} from '@env';
import {useContext} from 'react';
import {
  updateEmail,
  UpdateEmailDTO,
  updateName,
  UpdateNameDTO,
  updatePassword,
  UpdatePasswordDTO,
  updatePicture,
  UpdatePictureDTO,
} from '&/features/users';
import asyncStorage from '&/utils/storage';
import {AuthContext} from './auth';

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DB_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MSG_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};

const app = firebase.initializeApp(config);
const auth = firebase.auth(app);
const db = firebase.database(app);
const storage = firebase.storage(app);

export const useUpdate = () => {
  const {user, setUser} = useContext(AuthContext);
  const pictureFn = async (data: UpdatePictureDTO) => {
    await updatePicture(data);
    setUser(u => u && {...u, photoURL: data.value});
  };

  const nameFn = async (data: UpdateNameDTO) => {
    const {firstName, lastName} = data.value;
    await updateName(data);
    setUser(u => u && {...u, displayName: lastName + firstName});
  };

  const emailFn = async (data: UpdateEmailDTO) => {
    await updateEmail(data);
    const prevToken = await asyncStorage.getToken();
    asyncStorage.setToken({...prevToken, email: data.value});
    setUser(u => u && {...u, email: data.value});
  };

  const passwordFn = async (data: UpdatePasswordDTO) => {
    await updatePassword(data);
    const prevToken = await asyncStorage.getToken();
    asyncStorage.setToken({...prevToken, password: data.value});
  };

  return {
    picture: pictureFn,
    name: nameFn,
    email: emailFn,
    password: passwordFn,
  };
};

export default firebase;
export {auth, db, storage};
