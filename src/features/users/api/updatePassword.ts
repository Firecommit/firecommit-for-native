import firebase from '&/lib/firebase';

export type UpdatePasswordDTO = {
  user: firebase.User;
  value: string;
};

export const updatePassword = async (data: UpdatePasswordDTO) => {
  await data.user.updatePassword(data.value);
};
