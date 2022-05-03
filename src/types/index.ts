import {ParamListBase, RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

export type StackParamList = {
  landing: undefined;
  app: undefined;
  auth: undefined;
};

export type NavigatesProps = NativeStackScreenProps<StackParamList>;
export type useNavigationProps = StackNavigationProp<StackParamList>;

export type NavigatesType<T extends ParamListBase> = Array<{
  name: string;
  component: React.ComponentType<any>;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<T, string>;
        navigation: any;
      }) => NativeStackNavigationOptions);
}>;
