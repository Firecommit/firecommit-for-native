import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  signinWithEmailAndPassword,
  signoutFromCurrentUser,
  signupWithEmailAndPassword,
  SigninCredentialsDTO,
  SignupCredentialsDTO,
  UserResponse,
} from '&/features/auth';
import storage from '&/utils/storage';
import firebase, {auth} from './firebase';
import {omitObject} from '&/utils/omitObject';

const handleUserResponse = async (data: UserResponse) => {
  const {token, user} = data;
  const prevToken = await storage.getToken();
  storage.setToken({...prevToken, ...token});
  return user;
};

const loadUser = async () => {
  const data = await storage.getToken();
  const authData = data && omitObject(data, ['uid', 'code']);
  if (authData && authData.email && authData.password) {
    const {user} = await signinWithEmailAndPassword(authData);
    return user;
  }
  return null;
};

const signinFn = async (data: SigninCredentialsDTO) => {
  const response = await signinWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
};

const signupFn = async (data: SignupCredentialsDTO) => {
  const response = await signupWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
};

const signoutFn = async () => {
  const prevToken = await storage.getToken();
  storage.setToken({...prevToken, email: '', password: ''});
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
      {load && children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuth};
