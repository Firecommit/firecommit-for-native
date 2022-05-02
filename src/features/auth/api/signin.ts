import firebase, {auth} from '&/lib/firebase';

type signinCredentialsDTO = {
  email: string;
  password: string;
};

export const signinWithEmailAndPassword = (
  data: signinCredentialsDTO,
): Promise<firebase.auth.UserCredential> => {
  return auth.signInWithEmailAndPassword(data.email, data.password);
};
