import {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import Sound from 'react-native-sound';
type sounds = {
  advertising:Sound;
}
const useTts = () => {
  const [text, setText] = useState<keyof sounds>('advertising');
  const [sounds, setSound] = useState<Partial<sounds>>({});
  useEffect(() => {
    initTts(); //.then(() =>  console.tron.log('after initTts'));
  }, []);
  const initTts = async () => {
    Sound.setCategory('Playback');
    const advertising  = new Sound(`advertising.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    // TODO load other sounds 
    setSound({...sounds,advertising})
  };
  /**
   * the action of reading the text
   */
  const readText = async () => {
    const sound = sounds[text];
    if(sound){
    console.tron.log(
      'duration in seconds: ' +
        sound.getDuration() +
        'number of channels: ' +
        sound.getNumberOfChannels(),
    );
    sound.play(done =>
      done
        ? console.tron.log('played Sound')
        : console.tron.log('played Sound'),
    );
  }else{
    Alert.alert(
      "sound "+text+"not found",
      "oopes can't find sound"+text,
      [
        {
          text: "ok",
          style: "cancel",
        },
      ]
    );
  }
  };

  return {
    state: {text},
    actions: {
      readText,
      setText,
    },
  };
};
export default useTts;
