import React from 'react';

import {PermissionsAndroid, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import I18n from '../../i18n';
import Warper from '../../components/HeaderWarper';
import {BackIcon} from '../../components/Header';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

export default () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Bluetooth'>>();
  const [isBluetoothEnabled, setBluetoothEnabled] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  // TODO get the type of the devices
  const [Devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  React.useEffect(() => {
    RNBluetoothClassic.isBluetoothEnabled().then(enabled => {
      setBluetoothEnabled(enabled);
    });
    const enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(event =>
      setBluetoothEnabled(true),
    );
    const disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(event =>
      setBluetoothEnabled(false),
    );
    return () => {
      enabledSubscription.remove();
      disabledSubscription.remove();
    };
  }, []);

  /**
   * See https://reactnative.dev/docs/permissionsandroid for more information
   * on why this is required (dangerous permissions).
   */
  const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
          'In order to perform discovery, you must enable/allow ' +
          'fine location access to get nearby devices. ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const searchDevices = async () => {
    console.log('DeviceListScreen::getBondedDevices');
    try {
      const hasPermission = await requestAccessFineLocationPermission();
      if (!hasPermission)
        throw Error('user refused to give permission of fine access location');
      setSearching(true);
      const devices = await RNBluetoothClassic.startDiscovery();
      const pairedDevices = await RNBluetoothClassic.getBondedDevices();

      setSearching(false);
      // TODO paired devices logic
      setDevices([...devices, ...pairedDevices]);
    } catch (error) {
      setDevices([]);
      console.error(error);
    }
  };
  return (
    <Warper title={I18n.t('Listen')} accessoryLeft={<BackIcon />}>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Bluetooth is {isBluetoothEnabled ? 'enabled' : 'disabled'}
        </Text>
        {isBluetoothEnabled ? (
          <>
            <Button onPress={searchDevices}>
              {searching ? 'Searching ...' : 'search for device'}
            </Button>
            {Devices.map((dev, id) => (
              <Layout level="2" key={id.toString()} style={styles.device}>
                <Text>
                  {dev.bonded ? 'paired with' : ''} name : {dev.name} with
                  address : {dev.address}
                </Text>
              </Layout>
            ))}
          </>
        ) : (
          <Button onPress={() => RNBluetoothClassic.requestBluetoothEnabled()}>
            Enable Bluetooth
          </Button>
        )}
      </Layout>
    </Warper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  device: {
    padding: 5,
    margin: 10,
  },
});
