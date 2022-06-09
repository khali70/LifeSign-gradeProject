import {useEffect, useState} from 'react';

import Tts, {Voice} from 'react-native-tts';

type ttsStatus =
  | 'initializing'
  | 'initialized'
  | 'started'
  | 'cancelled'
  | 'finished';
type GetKeys<keys extends keyof Voice> = {
  [key in keys]: Voice[key];
};
type keys = 'id' | 'name' | 'language';
type voice = GetKeys<keys>;
type state = {
  voices: voice[];
  ttsStatus: ttsStatus;
  selectedVoice: string | null;
  speechRate: number;
  speechPitch: number;
  text: string;
};
const useTts = () => {
  const [voices, setVoices] = useState<state['voices']>([]);
  const [ttsStatus, setTtsStatus] =
    useState<state['ttsStatus']>('initializing');
  const [selectedVoice, setSelectedVoice] =
    useState<state['selectedVoice']>(null);
  const [speechRate, setSpeechRate] = useState<state['speechRate']>(0.5);
  const [speechPitch, setSpeechPitch] = useState<state['speechPitch']>(1);
  const [text, setText] = useState<state['text']>('');
  useEffect(() => {
    // console.tron.log('first effect');
    Tts.addEventListener('tts-start', event => setTtsStatus('started'));
    Tts.addEventListener('tts-finish', event => setTtsStatus('finished'));
    Tts.addEventListener('tts-cancel', event => setTtsStatus('cancelled'));
  }, []);
  useEffect(() => {
    // console.tron.log('second effect');
    initTts(); //.then(() =>  console.tron.log('after initTts'));
  }, []);

  useEffect(() => {
    Tts.setDefaultRate(speechRate);
  }, [speechRate]);
  useEffect(() => {
    Tts.setDefaultPitch(speechPitch);
  }, [speechPitch]);
  // useEffect(() => {}, [voices]);
  // useEffect(() => {}, [selectedVoice]);
  // useEffect(() => {}, [ttsStatus]);
  // useEffect(() => {}, [text]);

  const initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });

    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.tron.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[0].id);
      setVoices(availableVoices);
      setSelectedVoice(selectedVoice);
      setTtsStatus('initialized');
    } else {
      setTtsStatus('initialized');
    }
  };

  /**
   * the action of reading the text
   */
  const readText = async (readText?: string) => {
    await Tts.stop();
    Tts.speak(readText || text);
  };
  /**
   * chang default voice to default voice
   * @param voice voice object
   */
  const onVoicePress = async (voice: voice) => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // My Samsung S9 has always this error: "Language is not supported"
      console.tron.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    setSelectedVoice(voice.id);
  };
  const actions = {
    onVoicePress,
    readText,
    setSpeechPitch,
    setSpeechRate,
  };
  return {
    state: {voices, selectedVoice, text, speechPitch, speechRate, ttsStatus},
    actions: {
      onVoicePress,
      readText,
      setSpeechPitch,
      setSpeechRate,
      setText,
    },
  };
};
export default useTts;
