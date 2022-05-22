import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type UserStackParamList = {
  account: undefined;
  picture: undefined;
  username: undefined;
  email: undefined;
  password: undefined;
};

export type UserStackScreenProps = NativeStackScreenProps<UserStackParamList>;
