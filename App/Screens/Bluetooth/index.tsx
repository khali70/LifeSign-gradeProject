import { loadAIModel, setupTensorFlow, AiPredict } from "@components/AI";
import { BackIcon } from "@components/Header";
import Warper from "@components/HeaderWarper";
import I18n from "@i18n/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { modelLoaded, modelLoadFailure, receiveData } from "@Redux/action";
import {
  Button,
  ButtonGroup,
  Icon,
  Layout,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "_types/redux";
import { getPairedDevices } from "./helpers";
import ListDevices from "./ListDevices";
import reactotron from "../../../ReactotronConfig";
import { EventEmitter } from "expo-modules-core";
import { ReactNativeTts } from "react-native-tts";
import {
  requestAccessBluetoothPermission,
  requestAccessFineLocationPermission,
} from "@components/permissions";

type props = StackScreenProps<HomeStackPrams, "Bluetooth">;

export default ({ route, navigation }: props) => {
  const [bluetoothEnabled, setBluetoothEnabled] = React.useState(true);
  const [searching, setSearching] = React.useState(false);
  const [Devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  const [unPairedDev, setunPairedDev] = React.useState<BluetoothDevice[]>([]);
  const [subs, setSubs] = React.useState<any[]>([]);
  const bluetoothListeners = async () => {
    RNBluetoothClassic.isBluetoothEnabled().then((enabled) => {
      //FIXME RNBluetoothClassic.requestBluetoothEnabled()
      setBluetoothEnabled(enabled);
    });
    const enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(
      (event) => {
        setBluetoothEnabled(event.enabled);
      }
    );
    const disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(
      (event) => {
        setBluetoothEnabled(event.enabled);
      }
    );
    setSubs([enabledSubscription, disabledSubscription]);
  };

  React.useEffect(() => {
    (async () => {
      await bluetoothListeners();
      const add1 = "20:15:10:08:18:67";
    })();
    return () => {
      subs.forEach((l) => {
        l.remove();
      });
    };
  }, []);
  /* React.useEffect(() => {
    if (console?.tron) console.tron.log({ Devices, unPairedDev });
    else console.log({ Devices, unPairedDev });
  }, [unPairedDev, Devices]); */
  const BLUSearchIcon = () => (
    <>
      {searching && bluetoothEnabled && (
        <TopNavigationAction
          icon={<Icon name="refresh-outline" />}
          onPress={() =>
            getPairedDevices(
              { setSearching, setDevices, setunPairedDev },
              { searching }
            )
          }
        />
      )}
    </>
  );
  return (
    <Warper
      title={I18n.t(route.name)}
      accessoryLeft={<BackIcon />}
      accessoryRight={<BLUSearchIcon />}
    >
      <Layout style={styles.container}>
        {bluetoothEnabled ? (
          <ScrollView
            style={{
              minHeight: Dimensions.get("window").height,
              minWidth: Dimensions.get("window").width,
            }}
          >
            <>
              <ListDevices list={unPairedDev} title="unPaired Devices" />
              <ListDevices list={Devices} title="Available Devices" />
            </>
          </ScrollView>
        ) : (
          <>
            <Text category="h3">Bluetooth is Disabled</Text>
            <Button
              onPress={() => RNBluetoothClassic.requestBluetoothEnabled()}
            >
              Enable Bluetooth
            </Button>
          </>
        )}
      </Layout>
    </Warper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  likeButton: {
    marginVertical: 16,
  },
  device: {
    width: "98%",
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
});
