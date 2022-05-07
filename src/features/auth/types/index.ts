import firebase from '&/lib/firebase';
import {signinCredentialsDTO} from '../api/signin';

export type UserResponse = {
  token: signinCredentialsDTO;
  user: firebase.auth.UserCredential;
};
