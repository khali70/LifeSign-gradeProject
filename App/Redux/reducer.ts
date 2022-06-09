import { LayersModel } from "@tensorflow/tfjs";
import { Actions, data, reducer_state } from "_types/redux";
import { BluetoothEventSubscription } from "react-native-bluetooth-classic";

const INITIAL_STATE: reducer_state = {
  error: { has: null, stack: "" },
  sign: null,
  AIModel: null,
  app: null,
};

type reducer = (
  state: typeof INITIAL_STATE,
  { type, payload }: Actions
) => typeof INITIAL_STATE;

const Reducer: reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "HW_Data":
      return { ...state, sign: payload as data };
    case "HW_socket":
      return {
        ...state,
        HW_socket: payload as BluetoothEventSubscription,
      };
    case "AI_Load_model":
      return { ...state, AIModel: payload };
    case "AI_Load_model_Failure":
      console.tron.error(payload);
      return { ...state, error: payload };
    case "Load_Firebase":
      return { ...state, app: payload };
    default:
      return state;
  }
};

export default Reducer;
