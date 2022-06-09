import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Warper from "@components/HeaderWarper";
import I18n from "@i18n/index";
import useTts from "./useTts";
import { useSelector } from "react-redux";
import { data, RootState } from "_types/redux";
//Todo TTS with arabic support
type props = StackScreenProps<HomeStackPrams, "Speak">;
const Speak = ({ navigation, route }: props) => {
  const { state, actions } = useTts();
  const { sign } = useSelector<RootState, RootState["Reducer"]>(
    ({ Reducer }) => Reducer
  );
  const [stack, setStack] = useState<data["data"][]>(["0"]);

  useEffect(() => {
    if (sign?.data) {
      if (stack.length > 29) {
        stack.shift();
        stack.push(sign.data);
      } else {
        stack.push(sign.data);
      }
      const rep = stack.reduce(
        (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
        {} as { [key in data["data"]]: number }
      );
      if (rep[sign.data] === 15) {
        /**
         * change the value twice
         * - first when adding data to stack
         * - second when changing data in the stack
         */
        actions.setText(sign.data);
      }
    } else {
      console.log(`sign data is not defined`);
      console.log(JSON.stringify(sign, null, 2));
    }
  }, [sign]);
  useEffect(() => {
    if (!state.Speaking) actions.readText();
  }, [state.text]);
  return (
    <Warper title={I18n.t(route.name)}>
      <KeyboardAvoidingView
        style={[styles.keyboard]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          style={[styles.touchView]}
          onPress={Keyboard.dismiss}
        >
          <Layout style={[styles.layout]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ marginHorizontal: 40 }}>{state.text}</Text>
              {/* <Button
                style={styles.inputBtn}
                accessoryLeft={<Icon name="volume-up" />}
                onPress={() => actions.readText()}>
                Speak
              </Button> */}
            </View>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Warper>
  );
};
export default Speak;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  layout: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  touchView: {
    flex: 1,
    backgroundColor: "#f000ff",
    alignItems: "stretch",
    justifyContent: "center",
    minWidth: Dimensions.get("window").width,
    minHeight: 50,
  },
  text: {
    minHeight: 50,
  },
  inputBtn: {
    alignSelf: "flex-end",
  },
});
