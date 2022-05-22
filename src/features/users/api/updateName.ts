import firebase, {db} from '&/lib/firebase';

export type UpdateNameDTO = {
  user: firebase.User;
  value: {
    firstName: string;
    lastName: string;
  };
};

export const updateName = async (data: UpdateNameDTO) => {
  const {firstName, lastName} = data.value;
  await data.user.updateProfile({displayName: lastName + firstName});
  const userRef = db.ref('users').child(data.user.uid);
  await userRef.update({name: lastName + firstName});
};
