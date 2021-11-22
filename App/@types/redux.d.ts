import {  BluetoothEventSubscription, BluetoothNativeDevice } from "react-native-bluetooth-classic";
import { BConnect, receiveData } from "../Redux/action";
import store from "../Redux/store";

type bReadEvent = BluetoothEventSubscription;
type data = {data:string;device:BluetoothNativeDevice}
type Actions = ReturnType<typeof receiveData|typeof BConnect> // action types
type AppDispatch = typeof store.dispatch 