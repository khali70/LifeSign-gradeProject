import React from 'react';

import {PermissionsAndroid, StyleSheet,ScrollView, Dimensions, GestureResponderEvent} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigationAction,
} from '@ui-kitten/components';
import I18n from '../../i18n';
import Warper from '../../components/HeaderWarper';
import {BackIcon} from '../../components/Header';
import RNBluetoothClassic, {
  BluetoothDevice, BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
import { useDispatch } from 'react-redux';

export default () => {
  // TODO get route and navigation name
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Bluetooth'>>();
  const [isBluetoothEnabled, setBluetoothEnabled] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [Devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  const [PairedDev, setPairedDev] = React.useState<BluetoothDevice[]>([]);
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
    console.clear();
    console.log('DeviceListScreen::getBondedDevices');
    try {
      const hasPermission = await requestAccessFineLocationPermission();
      if (!hasPermission)
        throw Error('user refused to give permission of fine access location');
      if(searching){
        await RNBluetoothClassic.cancelDiscovery();
        setSearching(false);
      }else{
      setSearching(true);
      const devices = await RNBluetoothClassic.startDiscovery();
      setDevices([...devices]);
      // TODO new function for paired dev
      // const pairedDevices = await RNBluetoothClassic.getBondedDevices();
      // setPairedDev([...pairedDevices]);
      setSearching(false);
      }
    } catch (error) {
      setDevices([]);
      console.error(error);
    }
  };

  return (
    <Warper
      title={I18n.t('Bluetooth')}
      accessoryLeft={<BackIcon />}
      accessoryRight={
        <TopNavigationAction
          icon={
            searching ? (
              <Icon name="close-outline" />
            ) : (
              <Icon name="maximize-outline" />
            )
          }
          onPress={searchDevices}
        />
      }>
      <Layout style={styles.container}>
        {isBluetoothEnabled ? (
          <ScrollView style={{minHeight:Dimensions.get('window').height,minWidth:Dimensions.get('window').width}}>
            <ListDevices list={PairedDev} title="Paired Devices" />
            <ListDevices list={Devices} title="Available Devices" />
          </ScrollView>
        ) : (
          <>
            <Text category="h3">Bluetooth is Disabled</Text>
            <Button
              onPress={() => RNBluetoothClassic.requestBluetoothEnabled()}>
              Enable Bluetooth
            </Button>
          </>
        )}
      </Layout>
    </Warper>
  );
};
/**
 * ! button ui => set to Aya
 * ! filter bounded Dev Paired && Connected 
 * 
 */
const ListDevices: React.FC<{list: BluetoothDevice[]; title?: string}> = ({
  list,
  title = 'Available Devices',
}) => {
  const dispatch = useDispatch()
  const connectDev:
  (e:GestureResponderEvent,dev:BluetoothDevice)=>Promise<false | BluetoothEventSubscription>  
  = async (e,dev)=>{    
    if( !await dev.isConnected()){
      const connected = await dev.connect();
      console.log(connected ? "connected successfully":"failed to connect");
      if(!connected) return false;      
    }
    console.clear();
    const BReadSubscription = dev.onDataReceived(({data,device})=>{
        console.log(`${data}`);
      })
    return BReadSubscription;
  }
  return (
  <>
    {list.length > 0 && (
      <>
        <Text
          category="h5"
          style={{borderBottomColor: '#000', borderBottomWidth: 1}}>
          {title}
        </Text>
        {list.map((dev, id) => (
          <Layout level="2" key={id.toString()} style={styles.device} >
            <Text category="h5">{dev.name}</Text>
            <Text>{dev.address}</Text>
            <Button onPress={e=> {
              // connectDev(e,dev).then(eve=>{
              //   if(eve){
                  
              //   }
              // })
              //BUG need to sleep fix later
              dispatch({type:'B',payload:'this is test'});
              //TODO rssi signal strength max -41db min -71db
              }}>connect</Button>
          </Layout>
        ))}
      </>
    )}
  </>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  device: {
    width: '98%',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
});
