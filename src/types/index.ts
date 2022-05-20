import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import firebase from '&/lib/firebase';
import {WorkspaceCredentialsDTO} from '&/features/ver';
import {SigninCredentialsDTO} from '&/features/auth';

export type StackParamList = {
  landing: undefined;
  app: undefined;
  auth: undefined;
  verify: undefined;
};

export type StackNavigationProp = NativeStackScreenProps<StackParamList>;

export type StackNavigatesType = Array<{
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
  children?: StackNavigatesType;
}>;

export type TabNavigatesType = Array<{
  name: string;
  component: React.ComponentType<any>;
  options?: BottomTabNavigationOptions;
  children?: TabNavigatesType;
}>;
