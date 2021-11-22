import { bReadEvent,data } from "../@types/redux";

// TODO ts enums 
export const receiveData = (data:data) => (
  {
    type: 'BluetoothDataReceived',
    payload: data,
  } as const
);

export const BConnect =  (readEvent:bReadEvent) => (
  {
    type: 'BluetoothReadSubscription',
    payload: readEvent,
  } as const 
);
