import {
  BluetoothEventSubscription,
  BluetoothNativeDevice,
} from "react-native-bluetooth-classic";
import {
  BConnect,
  receiveData,
  modelLoadFailure,
  modelLoaded,
  FirebaseLoaded,
} from "../Redux/action";
import store from "@Redux/store";
import { LayersModel } from "@tensorflow/tfjs";
import { FirebaseApp } from "firebase/app";
export interface reducer_state {
  HW_socket?: BluetoothEventSubscription;
  sign: data | null;
  AIModel: LayersModel | null;
  error: { has: null | true; stack: unknown };
  app: null | FirebaseApp;
}
export interface RootState {
  Reducer: reducer_state;
}
type bReadEvent = BluetoothEventSubscription;
type data = {
  data: "0" | "1" | "2" | "3" | "4" | "5";
  device: BluetoothNativeDevice;
};
type MergeType<T> = { [K in keyof T]: T[K] };
type Actions = ReturnType<
  | typeof receiveData
  | typeof BConnect
  | typeof modelLoadFailure
  | typeof modelLoaded
  | typeof FirebaseLoaded
>; // action types
type AppDispatch = typeof store.dispatch;
