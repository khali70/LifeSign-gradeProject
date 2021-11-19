import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Icon, Input, Layout} from '@ui-kitten/components';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Warper from '../../components/HeaderWarper';
import I18n from '../../i18n';
import useTts from './useTts';

const Speak = () => {
  const {state, actions} = useTts();
  React.useEffect(() => {}, []);
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Home'>>();
  return (
    <Warper title={I18n.t('Speak')}>
      <KeyboardAvoidingView
        style={[styles.keyboard]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback
          style={[styles.touchView]}
          onPress={Keyboard.dismiss}>
          <Layout style={[styles.layout]}>
            <View style={styles.container}>
              <Input
                value={state.text}
                style={styles.text}
                placeholder="type text here to speak ..."
                multiline
                numberOfLines={5}
                onChangeText={e => actions.setText(e)}
              />
              <Button
                style={styles.inputBtn}
                accessoryLeft={<Icon name="volume-up" />}
                onPress={() => actions.readText()}>
                Speak
              </Button>
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
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  layout: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchView: {
    flex: 1,
    backgroundColor: '#f000ff',
    alignItems: 'stretch',
    justifyContent: 'center',
    minWidth: Dimensions.get('window').width,
    minHeight: 50,
  },
  text: {
    minHeight: 50,
  },
  inputBtn: {
    alignSelf: 'flex-end',
  },
});
