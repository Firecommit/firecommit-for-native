import {auth} from '&/lib/firebase';
import {UserResponse} from '../types';

export type SigninCredentialsDTO = {
  email: string;
  password: string;
};

export const signinWithEmailAndPassword = async (
  data: SigninCredentialsDTO,
): Promise<UserResponse> => {
  return {
    token: data,
    user: await auth.signInWithEmailAndPassword(data.email, data.password),
  };
};
