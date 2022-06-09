import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { Layout, Input, Button } from "@ui-kitten/components";

import I18n from "@i18n/index";
import Warper from "@components/HeaderWarper";
import Voice, {
  SpeechStartEvent,
  SpeechEndEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";
import SignsViews from "./SignsView";
import { getDownloadUrl, getSigns } from "@components/DB";

type props = StackScreenProps<HomeStackPrams, "Listen">;
//Fix too fat Component
const Listen = ({ navigation, route }: props) => {
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getSigns().then((s) => console.log(s));
    getDownloadUrl("external-content.duckduckgo.com.jpeg").then((imgUrl) => {
      console.log(imgUrl);
      setImages([...images, imgUrl]);
    });
  }, []);
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e: SpeechStartEvent) => {
    console.tron.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e: SpeechEndEvent) => {
    setLoading(false);
    console.tron.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e: SpeechResultsEvent) => {
    if (e.value) {
      let text = e.value[0];
      setResult(text);
    }
    console.tron.log("speech result handler", e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("ar-EG");
      console.tron.log("ar-EG");
    } catch (error) {
      console.tron.log("error raised", error);
      await Voice.start("en-Us");
      console.tron.log("en-US");
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.tron.log("error raised", error);
    }
  };

  return (
    <Warper title={I18n.t(route.name)}>
      <Layout style={styles.container}>
        <Layout style={styles.container}>
          <Text style={styles.headingText}>Speech Recognition</Text>
          <Layout level={"2"} style={styles.textInputStyle}>
            <Input
              value={result}
              placeholder="your text"
              style={{ flex: 1, borderWidth: 0 }}
              onChangeText={(text) => setResult(text)}
            />
            {isLoading ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png",
                  }}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            )}
          </Layout>
          {isLoading && (
            <Button
              style={{
                alignSelf: "center",
                marginTop: 8,
                borderRadius: 4,
              }}
              status={"danger"}
              onPress={stopRecording}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
            </Button>
          )}
        </Layout>
        <Layout level={"3"} style={styles.RepVContainer}>
          {/* {<SignsViews />} */}
          {images?.[0] && (
            <Image
              style={{
                flex: 1,
                alignSelf: "stretch",
                width: undefined,
                height: undefined,
              }}
              resizeMode="contain"
              source={{
                uri: images[0],
              }}
            />
          )}
        </Layout>
      </Layout>
    </Warper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headingText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 8,
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  text: {
    textAlign: "center",
  },
  likeButton: {
    marginVertical: 16,
  },
  RepVContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Listen;
