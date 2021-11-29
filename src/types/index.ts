import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthRootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Join: undefined;
};

export type AuthProps = NativeStackScreenProps<AuthRootStackParamList>;

type NavigationRootStackParamList = {
  Map: undefined;
  User: undefined;
};

export type NavigationProps =
  NativeStackScreenProps<NavigationRootStackParamList>;
