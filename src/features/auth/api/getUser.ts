import {auth} from '&/lib/firebase';

export const getUser = () => {
  return auth.currentUser;
};
