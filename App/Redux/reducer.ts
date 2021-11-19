import { BluetoothEventSubscription } from "react-native-bluetooth-classic";

const INITIAL_STATE:{
  BReadSubscription:BluetoothEventSubscription|null;
  msg:any;
} = {
  BReadSubscription:null,
  msg:''
};
//BUG need to sleep fix later
// delete var msg
type payload = BluetoothEventSubscription|string;
const bluetoothReducer:(state:typeof INITIAL_STATE,action:{type:string,payload:payload})=>typeof INITIAL_STATE =
(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'B':
      return {...state,msg:action.payload};
    default:
      return state
  }
};

export default bluetoothReducer;