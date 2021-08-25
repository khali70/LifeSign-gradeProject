import {
  useEffect,
  useState,
} from 'react';

import Tts, {Voice} from 'react-native-tts';

type ttsStatus = 'initializing'|'initialized'|'started'|'cancelled'|'finished';
type GetKeys<keys extends keyof Voice > = {
  [key in keys]: Voice[key]
};
type keys = 'id'|'name'|'language';
type voice = GetKeys<keys>;
type state = {
  voices: voice[],
  ttsStatus: ttsStatus,
  selectedVoice: string|null,
  speechRate: number,
  speechPitch: number,
  text: string,
};
const useTts = ()=>{
const [state,setState] = useState<state>({
  voices: [],
  ttsStatus: 'initializing' ,
  selectedVoice: null,
  speechRate: 0.5,
  speechPitch: 1,
  text: 'This is an example text',
})
useEffect(()=>{
  Tts.addEventListener('tts-start', event =>
      setState({...state,ttsStatus: 'started'}),
    );
    Tts.addEventListener('tts-finish', event =>
      setState({...state,ttsStatus: 'finished'}),
    );
    Tts.addEventListener('tts-cancel', event =>
      setState({...state,ttsStatus: 'cancelled'}),
    );
    Tts.setDefaultRate(state.speechRate);
    Tts.setDefaultPitch(state.speechPitch);
    Tts.getInitStatus().then(initTts);
},[])

const initTts = async () => {
  const voices = await Tts.voices();
  const availableVoices = voices
    .filter(v => !v.networkConnectionRequired && !v.notInstalled)
    .map(v => {
      if (
        v.id.includes('ar') ||
        v.name.includes('ar') ||
        v.language.includes('ar')
      ) {
        // console.log(v.id, v.name, v.language);
      }
      return {id: v.id, name: v.name, language: v.language};
    });

  let selectedVoice = null;
  if (voices && voices.length > 0) {
    selectedVoice = voices[0].id;
    try {
      await Tts.setDefaultLanguage(voices[0].language);
    } catch (err) {
      // My Samsung S9 has always this error: "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voices[0].id);
    setState({...state,
      voices: availableVoices,
      selectedVoice,
      ttsStatus: 'initialized',
    });
  } else {
    setState({...state,ttsStatus: 'initialized'});
  }
};

/**
   * the action of reading the text
   */
const  readText = async (text?:string) => {
  const options:typeof state.ttsStatus[] = ['cancelled','started'];
  
  if(options.includes(state.ttsStatus)){
    Tts.addEventListener('tts-finish',()=>{
      Tts.speak(text||state.text);
    })
  }else{
    Tts.stop()
    Tts.speak(text||state.text);
  }
};
/**
 * TODO: check the documentation 
 * set default voice rate to given `rate`
 * @param rate voice rate from 0.1 to 0.99 
 */
const setSpeechRate = async (rate:number) => {
  await Tts.setDefaultRate(rate);
  setState({...state,speechRate: rate});
};
/**
 * set default pitch speed to given `rate` 
 * @param rate voice Pitch form 0.5 to 2
 */
const setSpeechPitch = async (rate:number) => {
  await Tts.setDefaultPitch(rate);
  setState({...state,speechPitch: rate});
};
/**
 * chang default voice to default voice
 * @param voice voice object
 */
const onVoicePress = async (voice:voice) => {
  try {
    await Tts.setDefaultLanguage(voice.language);
  } catch (err) {
    // My Samsung S9 has always this error: "Language is not supported"
    console.log(`setDefaultLanguage error `, err);
  }
  await Tts.setDefaultVoice(voice.id);
  setState({...state,selectedVoice: voice.id});
};
const actions = {
  onVoicePress,
  readText,
  setSpeechPitch,
  setSpeechRate
}
return {state,setState,actions}
}
export default useTts;