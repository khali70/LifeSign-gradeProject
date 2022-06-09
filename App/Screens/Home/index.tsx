import React from "react";

import { Dimensions, StyleSheet, View } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  Icon,
  Layout,
  TopNavigationAction,
} from "@ui-kitten/components";
import I18n from "@i18n/index";
import Warper from "@components/HeaderWarper";
import { Info } from "@components/Header";

import { loadAIModel, setupTensorFlow } from "@components/AI";
import { AppDispatch } from "_types/redux";
import { modelLoaded, modelLoadFailure } from "@Redux/action";
import { useDispatch } from "react-redux";

type props = StackScreenProps<HomeStackPrams, "Home">;
export default ({ navigation, route }: props) => {
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    (async () => {
      await setupTensorFlow().catch((err) => dispatch(modelLoadFailure(err)));
      try {
        const model = await loadAIModel();
        dispatch(modelLoaded(model));
      } catch (err) {
        dispatch(modelLoadFailure(err));
      }
    })();
    return () => {};
  }, []);
  type screen = {
    name: string;
    route: keyof HomeStackPrams;
    icon?: JSX.Element;
  }[];
  const screens: screen = [
    { name: "Listening Mod", route: "Listen", icon: <Icon name="mic" /> },
    { name: "Speaking mod", route: "Speak", icon: <Icon name="volume-up" /> },
    { name: "About us", route: "About", icon: <Icon name="info" /> },
    { name: "Help", route: "Help", icon: <Icon name="question-mark-circle" /> },
  ];
  // BUG bluetooth connection
  return (
    <Warper
      title={I18n.t(route.name)}
      accessoryRight={
        <TopNavigationAction
          icon={<Icon name="bluetooth" />}
          onPress={() => navigation.push("Bluetooth")}
        />
      }
      accessoryLeft={<Info />}
    >
      <Layout style={styles.container}>
        <View style={styles.mainView}>
          {screens.map((screen, id) => (
            <Button
              key={id}
              style={styles.btn}
              status="basic"
              size="giant"
              onPress={() => navigation.push(screen.route)}
              accessoryLeft={screen.icon ? screen.icon : undefined}
              appearance="outline"
            >
              {screen.name}
            </Button>
          ))}
        </View>
      </Layout>
    </Warper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  likeButton: {
    marginVertical: 16,
  },
  btn: {
    width: 200,
    height: 200,
    flexBasis: Dimensions.get("window").width / 2 - 20,
    margin: 5,
  },
});
