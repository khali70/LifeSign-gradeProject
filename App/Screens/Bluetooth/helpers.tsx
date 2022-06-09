import { requestAccessFineLocationPermission } from "@components/permissions";
import { LayersModel } from "@tensorflow/tfjs";
import { GestureResponderEvent } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceReadEvent,
} from "react-native-bluetooth-classic";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "_types/redux";
import { AiHttpPredict, AiPredict } from "../../components/AI";
import { BConnect, receiveData } from "../../Redux/action";
const START_TRANSMITTING = "1";
type setters = {
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setDevices: React.Dispatch<React.SetStateAction<BluetoothDevice[]>>;
  setunPairedDev: React.Dispatch<React.SetStateAction<BluetoothDevice[]>>;
};
type getPaired = (
  setters: setters,
  getters: { searching: boolean }
) => Promise<void>;

export const getPairedDevices: getPaired = async (
  { setSearching, setDevices, setunPairedDev },
  { searching }
) => {
  console.tron.log("DeviceListScreen::getBondedDevices");
  try {
    const hasPermission = await requestAccessFineLocationPermission();
    if (!hasPermission)
      throw Error("user refused to give permission of fine access location");
    if (!searching) {
      setSearching(true);
      try {
        //BUG check also if devices is available

        const devices = await RNBluetoothClassic.getBondedDevices();

        setDevices(devices.filter((dev) => dev.bonded));
        setunPairedDev(devices.filter((dev) => !dev.bonded));
      } catch (err) {
        if (console?.tron) console.tron.error(err);
        else console.log(err);
      }
      setSearching(false);
    }
  } catch (error) {
    setDevices([]);
    if (console?.tron) console.tron.error(error);
    else console.error(error);
  }
};

const ReceivedDataListener = async (
  { data, device }: BluetoothDeviceReadEvent,
  dispatch: AppDispatch,
  model: any
) => {
  try {
    if (model) {
      // Fix handel error if data not valid
      // Fix make the error from redux is better
      const shape: [number, number] = [1, 10];
      const dataSplit = data.split(",").map(parseFloat);
      if (
        dataSplit.every((n) => typeof n === "number" && n !== NaN) &&
        dataSplit.length === shape[1]
      ) {
        AiPredict(model, dataSplit.slice(0, shape[1]), shape).then(
          (prediction) => {
            dispatch(receiveData({ data: prediction as any, device }));
          }
        );
        // .catch((err) => {
        //   dispatch(receiveData({ data: data.toString() as any, device }));
        // });
      }
    } else {
      throw "model is undefined";
    }
  } catch (err) {
    if (console?.tron) console.tron.error(err);
    else console.log(err);
    console.log(JSON.stringify({ data, device }, null, 2));
  }
};
// Bug connection state if already connected
// just catch
type connection_handler = (
  e: GestureResponderEvent,
  dev: BluetoothDevice,
  dispatch: AppDispatch,
  model: any
) => Promise<boolean>;
export const connect_bluetooth_device: connection_handler = async (
  e,
  dev,
  dispatch,
  model
) => {
  const _connected = await dev.isConnected();
  if (!_connected) {
    //FIXME catch if dev offline
    const connected = await dev.connect({ delimiter: "\r\n" });
    // const connected = await dev.connect({ DELIMITER: "\n" });

    if (!connected) return false;
  }
  const BReadSubscription = dev.onDataReceived(async (data) => {
    //TODO make some sort of testing
    data.data = data.data.replace(/[\n\r]/g, "");
    if (data.data.toString().trim().length > 0) {
      console.log("onDataReceived");
      console.log(JSON.stringify(data, null, 2));
      console.log("onDataReceived End");
      await ReceivedDataListener(data, dispatch, model);
    }
  });
  dispatch(BConnect(BReadSubscription));
  return true;
};
