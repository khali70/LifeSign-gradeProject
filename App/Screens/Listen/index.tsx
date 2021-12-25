import React, { useEffect } from 'react';

import {Alert, SafeAreaView, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import I18n from '@i18n/index';
import Warper from '@components/HeaderWarper';
import Voice from '@react-native-voice/voice';

type props = StackScreenProps<HomeStackPrams,'Listen'>;
export default ({navigation,route}:props) => {
  useEffect(() => {
    initFunction()
}, []);
const initFunction =  async () =>{
  if(await Voice.isAvailable()){
    Voice.onSpeechStart =(e)=>{
      console.tron.log("onSpeechStart",e)
    };
    Voice.onSpeechRecognized =(e)=>{
      console.tron.log("onSpeechRecognized",e)
    };
    Voice.onSpeechEnd =(e)=>{
      console.tron.log("onSpeechEnd",e)
    };
    Voice.onSpeechError =(e)=>{
      console.tron.log("onSpeechError",e)
    };
    Voice.onSpeechResults =(e)=>{
      console.tron.log("onSpeechResults",e)
    };
    Voice.onSpeechPartialResults =(e)=>{
      console.tron.log("onSpeechPartialResults",e)
    };
    Voice.onSpeechVolumeChanged =(e)=>{
      console.tron.log("onSpeechVolumeChanged",e)
    };      
  }else{
    Alert.alert('stt not found',`speech to text is not available on this device`,[
      {
        text:"ok",
        style:"cancel"
      }
    ])
  }
}
    /**
   * ! google speak to text
   * ! load image to text
   */
  const listen = async ()=>{
   await Voice.start('ar');
   setTimeout(()=>{
     Voice.stop()
   },1000)
  }
  return (
    <Warper title={I18n.t(route.name)}>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Soon listen mod
        </Text>
        <Button onPress={listen}> 
        listen
        </Button>
        <Button
          accessoryLeft={<Icon name="home" />}
          style={styles.likeButton}
          onPress={() => navigation.goBack()}>
          Go back
        </Button>
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
});
