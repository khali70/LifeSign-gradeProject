import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';

import useTts from './useTts';

export default () => {
  const {state, actions} = useTts();
  // FIXME not the best practice to setState
  const [tts, setTTs] = React.useState(state.text);
  const setText = (text: string) => {
    state.text = text;
  };
  React.useEffect(() => {
    setTTs('we will not forget what happen with abdalah');
  }, []);
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Speak'>>();
  const speak = async () => {
    setText(tts);
    actions.readText();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Speak" alignment="center" />
      <Divider />

      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Hardware Screen
        </Text>
        <Input value={tts} onChangeText={e => setTTs(e)} />
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
