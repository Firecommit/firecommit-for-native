import firebase from '&/lib/firebase';
import {SigninCredentialsDTO} from '../api/signin';

export type UserResponse = {
  token: SigninCredentialsDTO;
  user: firebase.auth.UserCredential;
};
