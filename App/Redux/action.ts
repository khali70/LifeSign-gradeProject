import { LayersModel } from "@tensorflow/tfjs";
import { bReadEvent, data } from "_types/redux";

/** 
 // Bug
 * fix types
 * connect types for actions,reducers,useSelector
 * dispatch system
 * Handel fails
 *  - BConnect
 *  -
 */
export const receiveData = (data: data) =>
  ({
    type: "HW_Data",
    payload: data,
  } as const);

export const BConnect = (readEvent: bReadEvent) =>
  ({
    type: "HW_socket",
    payload: readEvent,
  } as const);

export const modelLoaded = (model: LayersModel) =>
  ({
    type: "AI_Load_model",
    payload: model,
  } as const);

export const modelLoadFailure = (err: unknown) =>
  ({
    type: "AI_Load_model_Failure",
    payload: { has: true, stack: err },
  } as const);
