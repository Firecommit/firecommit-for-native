import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/routers';
import { Accelerometer, ThreeAxisMeasurement } from 'expo-sensors';
import { RefObject } from 'react';

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

/* navigation types */
export type Props = NativeStackScreenProps<ParamListBase, 'Feed'>;

/* sensor data types */
export type SubscriptArray = Array<
  ReturnType<typeof Accelerometer.addListener>
>;

export type SensorDataRefArray = Array<RefObject<ThreeAxisMeasurement>>;
export type SensorDataRefObj = {
  acc: RefObject<ThreeAxisMeasurement>;
  mag: RefObject<ThreeAxisMeasurement>;
  gyr: RefObject<ThreeAxisMeasurement>;
};

export type AttitudeData = {
  pitch: number;
  roll: number;
  yaw: number;
};

export type StepData = {
  count: number;
  length: number;
};
