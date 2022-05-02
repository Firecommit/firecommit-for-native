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
import {useState} from 'react';

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

const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  auth.onAuthStateChanged(res => {
    if (res) setUser(res);
  });
  return {user};
};

export default firebase;
export {auth, db, storage};
export {useAuth};
