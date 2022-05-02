import firebase, {auth} from '&/lib/firebase';

type signupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signupWithEmailAndPassword = (
  data: signupCredentialsDTO,
): Promise<firebase.auth.UserCredential> => {
  return auth.createUserWithEmailAndPassword(data.email, data.password);
};
