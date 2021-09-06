import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

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
  TopNavigationAction,
} from '@ui-kitten/components';
import I18n from '../../i18n';

import useTts from './useTts';
import Warper from '../../components/HeaderWarper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Linking} from 'react-native';
export default () => {
  const {state, actions} = useTts();
  React.useEffect(() => {
    actions.setText('type the text you want to say here');
  }, []);
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Home'>>();

  return (
    <Warper title={I18n.t('Speak')} root>
      <Layout style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}>
            <Input value={state.text} onChangeText={e => actions.setText(e)} />
            <View>
              <Button
                style={styles.speak}
                accessoryLeft={<Icon name="volume-up" />}
                onPress={() => actions.readText()}>
                {I18n.t('Speak')}
              </Button>
              <Button
                style={styles.goHome}
                accessoryLeft={<Icon name="home" />}
                onPress={() => navigation.push('Listen')}>
                {I18n.t('GoListen')}
              </Button>
              <Button onPress={() => Linking.openURL(`tel:911`)}>
                call 911
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Layout>
    </Warper>
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
  speak: {
    marginVertical: 16,
  },
  goHome: {
    marginVertical: 16,
    paddingHorizontal: 20,
  },
});
