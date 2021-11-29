import React, { createContext, FC, useEffect, useState } from 'react';
import firebase, { auth } from '../../firebase';

type UserProps = firebase.User | null | undefined;

type AuthContextProps = {
  currentUser: UserProps;
  isSignedIn: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  isSignedIn: false,
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
    setIsSignedIn(Boolean(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isSignedIn }}>
      {currentUser === undefined ? <></> : children}
    </AuthContext.Provider>
  );
};
