import React from 'react';

import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import I18n from '@i18n/index';
import Warper from '@components/HeaderWarper';

type props = StackScreenProps<HomeStackPrams,'About'>;
export default ({navigation,route}:props) => {
  return (
    <Warper title={I18n.t(route.name)}>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          info screen
        </Text>
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
  likeButton: {
    marginVertical: 16,
  },
});
