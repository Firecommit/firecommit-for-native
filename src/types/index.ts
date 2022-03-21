import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type RootStackParamList = {
  Join: undefined;
  Drawer: undefined;
};

export type StackProps = NativeStackScreenProps<RootStackParamList>;

type RootDrawerParamList = {
  Add: undefined;
  Tab: undefined;
};

export type DrawerProps = DrawerScreenProps<RootDrawerParamList>;

export type ErrorProps = {
  msg: string;
  code?: string;
};
