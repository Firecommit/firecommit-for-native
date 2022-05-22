import firebase, {db} from '&/lib/firebase';

export type UpdateEmailDTO = {
  user: firebase.User;
  value: string;
};

export const updateEmail = async (data: UpdateEmailDTO) => {
  await data.user.updateEmail(data.value);
  const userRef = db.ref('users').child(data.user.uid);
  await userRef.update({email: data.value});
};
