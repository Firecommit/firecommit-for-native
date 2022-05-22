import firebase, {db, storage} from '&/lib/firebase';

export type UpdatePictureDTO = {
  user: firebase.User;
  value: string;
};

export const updatePicture = async (data: UpdatePictureDTO) => {
  const blob = await fetch(data.value).then(res => res.blob());
  const imageRef = storage.ref('users/icon').child(data.user.uid);
  const snapshot = await imageRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  await data.user.updateProfile({photoURL: url});
  const userRef = db.ref('users').child(data.user.uid);
  await userRef.update({photoURL: url});
};
