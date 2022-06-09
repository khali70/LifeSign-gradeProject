import { PermissionsAndroid } from "react-native";

/**
 * See https://reactnative.dev/docs/permissionsandroid for more information
 * on why this is required (dangerous permissions).
 */
export const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Access fine location required for discovery",
      message:
        "In order to perform discovery, you must enable/allow " +
        "fine location access to get nearby devices. ",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
interface permissions {
  READ_CALENDAR: any;
  WRITE_CALENDAR: any;
  CAMERA: any;
  READ_CONTACTS: any;
  WRITE_CONTACTS: any;
  GET_ACCOUNTS: any;
  ACCESS_FINE_LOCATION: any;
  ACCESS_COARSE_LOCATION: any;
  ACCESS_BACKGROUND_LOCATION: any;
  RECORD_AUDIO: any;
  READ_PHONE_STATE: any;
  CALL_PHONE: any;
  READ_CALL_LOG: any;
  WRITE_CALL_LOG: any;
  ADD_VOICEMAIL: any;
  USE_SIP: any;
  PROCESS_OUTGOING_CALLS: any;
  BODY_SENSORS: any;
  SEND_SMS: any;
  RECEIVE_SMS: any;
  READ_SMS: any;
  RECEIVE_WAP_PUSH: any;
  RECEIVE_MMS: any;
  READ_EXTERNAL_STORAGE: any;
  WRITE_EXTERNAL_STORAGE: any;
  BLUETOOTH_CONNECT: any;
  BLUETOOTH_SCAN: any;
  BLUETOOTH_ADVERTISE: any;
  ACCESS_MEDIA_LOCATION: any;
  ACCEPT_HANDOVER: any;
  ACTIVITY_RECOGNITION: any;
  ANSWER_PHONE_CALLS: any;
  READ_PHONE_NUMBERS: any;
  UWB_RANGING: any;
}
export const requestAccessBluetoothPermission = async (
  permissions: Array<keyof permissions>
) => {
  let permState: Partial<permissions> = {};
  for (const perm of permissions) {
    if (PermissionsAndroid.PERMISSIONS?.[perm]) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[perm],
        {
          title: "need Permission for " + perm,
          message:
            "In order to perform discovery, you must enable/allow " +
            "fine location access to get nearby devices. ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      console.log("perm " + perm + " " + granted.toString());
      permState[perm] = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      console.log(`${perm} not found in this device`);
    }
  }
  return permState;
};
