import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  signinCredentialsDTO,
  signinWithEmailAndPassword,
  signoutFromCurrentUser,
  signupCredentialsDTO,
  signupWithEmailAndPassword,
  UserResponse,
} from '&/features/auth';
import storage from '&/utils/storage';
import firebase, {auth} from './firebase';

const handleUserResponse = (data: UserResponse) => {
  const {token, user} = data;
  storage.setToken(JSON.stringify(token));
  return user;
};

const loadUser = async () => {
  const data = JSON.parse(await storage.getToken());
  if (data) {
    const {user} = await signinWithEmailAndPassword(data);
    return user;
  }
  return null;
};

const signinFn = async (data: signinCredentialsDTO) => {
  const response = await signinWithEmailAndPassword(data);
  const user = handleUserResponse(response);
  return user;
};

const signupFn = async (data: signupCredentialsDTO) => {
  const response = await signupWithEmailAndPassword(data);
  const user = handleUserResponse(response);
  return user;
};

const signoutFn = () => {
  storage.clearToken();
  signoutFromCurrentUser();
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextTypes = {
  user: firebase.User | null;
};

const AuthContext = createContext<AuthContextTypes>({
  user: null,
});

const useAuth = () => {
  const {user} = useContext(AuthContext);
  return {
    user,
    signin: signinFn,
    signup: signupFn,
    signout: signoutFn,
  };
};

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    loadUser().finally(() => setLoad(true));
    auth.onAuthStateChanged(state => {
      setUser(state);
    });
  }, []);
  const value = useMemo(() => ({user}), [user]);
  return (
    <AuthContext.Provider value={value}>
      {load ? children : null}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuth};
