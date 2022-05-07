import {auth} from '&/lib/firebase';
import {omitObject} from '&/utils/omitObject';
import {UserResponse} from '../types';

export type signupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signupWithEmailAndPassword = async (
  data: signupCredentialsDTO,
): Promise<UserResponse> => {
  return {
    token: omitObject<signupCredentialsDTO>(data, ['firstName', 'lastName']),
    user: await auth.createUserWithEmailAndPassword(data.email, data.password),
  };
};
