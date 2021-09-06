import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Icon, Input, Layout} from '@ui-kitten/components';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Warper from '../../components/HeaderWarper';
import I18n from '../../i18n';
import useTts from './useTts';

export default () => {
  const {state, actions} = useTts();
  React.useEffect(() => {
    actions.setText('type the text you want to say here');
  }, []);
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Home'>>();
  // BUG width chang with text view
  return (
    <Warper title={I18n.t('Speak')}>
      <Layout style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Input
                value={state.text}
                onChangeText={e => actions.setText(e)}
              />
              <Button
                style={styles.inputBtn}
                size="small"
                accessoryLeft={<Icon name="volume-up" />}
                onPress={() => actions.readText()}
              />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  inputBtn: {
    paddingVertical: 10,
    marginLeft: 10,
  },
  btn: {
    marginVertical: 16,
  },
  helpBtn: {
    flex: 1,
    marginHorizontal: 10,
  },
});
