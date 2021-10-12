import React from 'react';

import {Dimensions, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import I18n from '../../i18n';
import Warper from '../../components/HeaderWarper';

export default () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Home'>>();
  type screen = {
    name: string;
    route: keyof HomeStackPrams;
    icon?: JSX.Element;
  }[];
  const screens: screen = [
    {name: 'Listening Mod', route: 'Listen', icon: <Icon name="mic" />},
    {name: 'Speaking mod', route: 'Speak', icon: <Icon name="volume-up" />},
    {name: 'About us', route: 'About', icon: <Icon name="info" />},
    {name: 'Help', route: 'Help', icon: <Icon name="question-mark-circle" />},
  ];
  return (
    <Warper title={I18n.t('Listen')} root>
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
              appearance="outline">
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  btn: {
    width: 200,
    height: 200,
    flexBasis: Dimensions.get('window').width / 2 - 20,
    margin: 5,
  },
});
