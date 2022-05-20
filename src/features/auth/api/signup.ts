import {auth} from '&/lib/firebase';
import {omitObject} from '&/utils/omitObject';
import {UserResponse} from '../types';

export type SignupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signupWithEmailAndPassword = async (
  data: SignupCredentialsDTO,
): Promise<UserResponse> => {
  return {
    token: omitObject<SignupCredentialsDTO>(data, ['firstName', 'lastName']),
    user: await auth.createUserWithEmailAndPassword(data.email, data.password),
  };
};
