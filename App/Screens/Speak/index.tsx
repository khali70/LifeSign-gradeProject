import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';

import useTts from './useTts';

export default () => {
  const {state, setState, actions} = useTts();
  React.useEffect(() => {
    state.text = `we will not forget what happen with abdalah    `;
  }, []);
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Speak'>>();
  const speak = async () => {
    await actions.readText()
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Speak" alignment="center" />
      <Divider />

      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Hardware Screen
        </Text>
        <Text>Tts voices {state.voices.length}</Text>
        <Text>TTS Status {state.ttsStatus}</Text>
        <Button
          style={styles.goHome}
          accessoryLeft={<Icon name="home" />}
          onPress={() => navigation.goBack()}>
          Go Home
        </Button>
        <Button
          style={styles.speak}
          accessoryLeft={<Icon name="volume-up" />}
          onPress={() => speak()}>
          Speak
        </Button>
      </Layout>
    </SafeAreaView>
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
  goHome: {
    marginVertical: 16,
  },
  speak: {
    marginVertical: 16,
    paddingHorizontal: 20,
  },
});
