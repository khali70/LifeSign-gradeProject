import Tts, {Voice} from 'react-native-tts';

type props = {};
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
export default class TTS  {
  state:state = {
    voices: [],
    ttsStatus: 'initializing' ,
    selectedVoice: null,
    speechRate: 0.5,
    speechPitch: 1,
    text: 'This is an example text',
  };

  constructor() {
    Tts.addEventListener('tts-start', event =>
      this.setState({ttsStatus: 'started'}),
    );
    Tts.addEventListener('tts-finish', event =>
      this.setState({ttsStatus: 'finished'}),
    );
    Tts.addEventListener('tts-cancel', event =>
      this.setState({ttsStatus: 'cancelled'}),
    );
    console.log('log at'+ new Date().toISOString())
    Tts.setDefaultRate(this.state.speechRate);
    Tts.setDefaultPitch(this.state.speechPitch);
    Tts.getInitStatus().then(this.initTts);
  }

private  initTts = async () => {
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
      this.setState({
        voices: availableVoices,
        selectedVoice,
        ttsStatus: 'initialized',
      });
    } else {
      this.setState({ttsStatus: 'initialized'});
    }
  };
  /**
   * the action of reading the text
   */
  readText = async () => {
    Tts.stop();
    Tts.speak(this.state.text);
  };
  /**
   * TODO: check the documentation 
   * set default voice rate to given `rate`
   * @param rate voice rate from 0.1 to 0.99 
   */
  setSpeechRate = async (rate:number) => {
    await Tts.setDefaultRate(rate);
    this.setState({speechRate: rate});
  };
  /**
   * set default pitch speed to given `rate` 
   * @param rate voice Pitch form 0.5 to 2
   */
  setSpeechPitch = async (rate:number) => {
    await Tts.setDefaultPitch(rate);
    this.setState({speechPitch: rate});
  };
  /**
   * chang default voice to default voice
   * @param voice voice object
   */
  onVoicePress = async (voice:voice) => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // My Samsung S9 has always this error: "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    this.setState({selectedVoice: voice.id});
  };
  useState(){
    return[this.state,this.setState]
  }

  setState(newState:Partial<state>){
    
    this.state={...this.state,...newState}
    console.log(this.state.ttsStatus);
  }
  render(){
    return null
  }
}
