import {auth} from '&/lib/firebase';

export const signoutFromCurrentUser = (): Promise<void> => {
  return auth.signOut();
};
