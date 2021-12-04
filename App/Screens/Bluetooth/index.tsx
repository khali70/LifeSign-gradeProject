import React from 'react';

import {PermissionsAndroid, StyleSheet,ScrollView, Dimensions, GestureResponderEvent} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp,StackScreenProps} from '@react-navigation/stack';
import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigationAction,
} from '@ui-kitten/components';
import I18n from '@i18n/index';
import Warper from '@components/HeaderWarper';
import {BackIcon} from '@components/Header';
import RNBluetoothClassic, {
  BluetoothDevice, BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
import { useDispatch } from 'react-redux';
import { BConnect, receiveData } from '@Redux/action';

type props = StackScreenProps<HomeStackPrams,'Bluetooth'>;
export default ({route,navigation}:props) => {
  const [isBluetoothEnabled, setBluetoothEnabled] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [Devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  const [unPairedDev, setunPairedDev] = React.useState<BluetoothDevice[]>([]);
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
    getPairedDevices()
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

  const getPairedDevices = async () => {
    console.tron.log('DeviceListScreen::getBondedDevices');
    try {
      const hasPermission = await requestAccessFineLocationPermission();
      if (!hasPermission)
        throw Error('user refused to give permission of fine access location');
      if(!searching){
      setSearching(true);
      const devices = (await RNBluetoothClassic.startDiscovery());

      setDevices(devices.filter(dev=>dev.bonded));
      setunPairedDev(devices.filter(dev=>!dev.bonded))
      setSearching(false);
      }
    } catch (error) {
      setDevices([]);
      console.tron.error(error);
    }
  };

  return (
    <Warper
      title={I18n.t(route.name)}
      accessoryLeft={<BackIcon />}
     >
      <Layout style={styles.container}>
        {isBluetoothEnabled ? (
          <ScrollView style={{minHeight:Dimensions.get('window').height,minWidth:Dimensions.get('window').width}}>
            {searching?<Text>searching...</Text>:(
              <>
              <ListDevices list={unPairedDev} title="unPaired Devices" />
            <ListDevices list={Devices} title="Available Devices" />
            </>
            )}
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
      console.tron.log(connected ? "connected successfully":"failed to connect");
      if(!connected) return false;      
    }
    const BReadSubscription = dev.onDataReceived(({data,device})=>{
        dispatch(receiveData({data,device}));
        console.tron.log(`${data}`); 
      })
    return BReadSubscription;
  }
  const getPercentage = (rssi:number)=>{
    //rssi signal strength max -41db min -71db 
    const top_value = -41;
    const bottom_value = -71;
    const range = top_value - bottom_value
    const percent = (rssi - bottom_value) / range;
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
            {dev.bonded&&<Button onPress={e=> {
              console.tron.log(dev)
              connectDev(e,dev).then(eve=>{
                if(eve){
                  dispatch(BConnect(eve));
                }
              })
              }}>connect</Button>}
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
