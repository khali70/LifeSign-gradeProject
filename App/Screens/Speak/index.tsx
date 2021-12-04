import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
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
import Warper from '@components/HeaderWarper';
import I18n from '@i18n/index';
import useTts from './useTts';

type props = StackScreenProps<HomeStackPrams,'Speak'>;
const Speak = ({navigation,route}:props) => {
  const {state, actions} = useTts();
  return (
    <Warper title={I18n.t(route.name)}>
      <KeyboardAvoidingView
        style={[styles.keyboard]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback
          style={[styles.touchView]}
          onPress={Keyboard.dismiss}>
          <Layout style={[styles.layout]}>
            <View style={styles.container}>
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
