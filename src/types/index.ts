import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MaterialBottomTabNavigationOptions} from '@react-navigation/material-bottom-tabs';

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
  options?: MaterialBottomTabNavigationOptions;
  children?: TabNavigatesType;
}>;
