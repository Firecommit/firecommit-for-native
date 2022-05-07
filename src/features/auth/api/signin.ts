import {auth} from '&/lib/firebase';
import {UserResponse} from '../types';

export type signinCredentialsDTO = {
  email: string;
  password: string;
};

export const signinWithEmailAndPassword = async (
  data: signinCredentialsDTO,
): Promise<UserResponse> => {
  return {
    token: data,
    user: await auth.signInWithEmailAndPassword(data.email, data.password),
  };
};
