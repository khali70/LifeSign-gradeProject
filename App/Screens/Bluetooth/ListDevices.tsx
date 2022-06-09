import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { BluetoothDevice } from "react-native-bluetooth-classic";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../@types/redux";
import { connect_bluetooth_device as connectDev } from "./helpers";
/**
 * - devices list
 * - handel connection
 */
const ListDevices: React.FC<{ list: BluetoothDevice[]; title: string }> = ({
  list,
  title = "Available Devices",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const nav =
    useNavigation<
      StackScreenProps<HomeStackPrams, "Bluetooth">["navigation"]
    >();

  const model = useSelector<any, any>((state) => state.Reducer?.AIModel);

  //Fix
  const getPercentage = (rssi: number) => {
    //rssi signal strength max -41db min -71db
    const top_value = -41;
    const bottom_value = -71;
    const range = top_value - bottom_value;
    const percent = (rssi - bottom_value) / range;
  };
  //Fix refactor
  return (
    <>
      {list.length > 0 && (
        <>
          <Layout level="3">
            <Text
              category="h5"
              style={{
                borderBottomColor: "#000",
                textAlign: "center",
                padding: 4,
              }}
            >
              {title}
            </Text>
          </Layout>
          {list.map((dev, id) => (
            <Layout key={id.toString()} style={styles.device}>
              <Text category="h6">{dev.name}</Text>
              {dev.bonded ? (
                <Button
                  size={"tiny"}
                  onPress={(e) => {
                    connectDev(e, dev, dispatch, model)
                      .then((connected) => {
                        if (connected) nav.push("Speak");
                      })
                      .catch((err) => console.error(err));
                  }}
                >
                  connect
                </Button>
              ) : (
                <Button size={"tiny"} appearance={"ghost"}>
                  need to Paired
                </Button>
              )}
            </Layout>
          ))}
        </>
      )}
    </>
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
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
export default ListDevices;
