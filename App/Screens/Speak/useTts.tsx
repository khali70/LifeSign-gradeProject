import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Sound from "react-native-sound";
import { data } from "../../@types/redux";
type tSounds = {
  advertising: Sound;
  five: Sound;
  four: Sound;
  one: Sound;
  three: Sound;
  two: Sound;
  zero: Sound;
};
const useTts = () => {
  const [text, setText] = useState<keyof tSounds>("zero");
  const [sounds, setSound] = useState<Partial<tSounds>>({});
  const [Speaking, setSpeaking] = useState<boolean>(false);
  const [isReady, setReady] = useState<boolean>(false);
  useEffect(() => {
    initTts();
    // console.log(text, "is the current value");
    readText();
  }, [text]);
  const initTts = async () => {
    Sound.setCategory("Playback");
    type typeAlias = { [key in keyof tSounds]: Sound | null };
    const signs: typeAlias = {
      advertising: null,
      five: null,
      four: null,
      one: null,
      three: null,
      two: null,
      zero: null,
    };

    for (const s in signs) {
      signs[s as keyof tSounds] = new Sound(
        `${s}.wav`,
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
        }
      );
    }
    // TODO load other sounds
    setSound({ ...sounds, ...(signs as tSounds) });
    setReady(true);
  };
  // const loadSound = async (voiceFileName: keyof sounds) => {
  //   Sound.setCategory('Playback');
  //   const sound = new Sound(
  //     `${voiceFileName}.mp3`,
  //     Sound.MAIN_BUNDLE,
  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }
  //     },
  //   );
  //   return sound;
  // };
  /**
   * the action of reading the text
   */
  const readText = async () => {
    if (!isReady) return;
    if (Speaking) {
      console.tron.log("speaking now");
      return;
    }
    try {
      setSpeaking(true);
      const sound = sounds[text] as Sound;
      console.tron.log(
        "duration in seconds: " +
          sound.getDuration() +
          "number of channels: " +
          sound.getNumberOfChannels()
      );
      sound.play((done) => {
        console.tron.log(`played Sound ${done}`);
        setSpeaking(false);
      });
    } catch (err) {
      console.tron.error(err);
      setSpeaking(false);
      Alert.alert(
        "sound " + text + "not found",
        "oopes can't find sound " + text,
        [
          {
            text: "ok",
            style: "cancel",
          },
        ]
      );
    }
  };
  const safelySetText = (_txt: data["data"]) => {
    const map: {
      [key in data["data"]]: keyof tSounds;
    } = {
      "0": "zero",
      "1": "one",
      "2": "two",
      "3": "three",
      "4": "four",
      "5": "five",
    };
    const txt = map?.[_txt] ? map[_txt] : "zero";
    if (txt !== text) {
      setText(txt);
    }
  };
  return {
    state: { text, Speaking },
    actions: {
      readText,
      setText: safelySetText,
    },
  };
};
export default useTts;
