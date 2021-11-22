import { Actions } from "@types/redux";

const INITIAL_STATE = {
  BReadSubscription:null,
};
const bluetoothReducer:(state:typeof INITIAL_STATE,action:Actions)=>typeof INITIAL_STATE =
(state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    default:
      return state
  }
};

export default bluetoothReducer;