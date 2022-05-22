import firebase, {db} from '&/lib/firebase';

export type UpdatePictureDTO = {
  user: firebase.User;
  value: string;
};

export const updatePicture = async (data: UpdatePictureDTO) => {
  await data.user.updateProfile({photoURL: data.value});
  const userRef = db.ref('users').child(data.user.uid);
  await userRef.update({photoURL: data.value});
};
