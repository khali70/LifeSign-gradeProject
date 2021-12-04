import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import I18n from '@i18n/index';
import Warper from '@components/HeaderWarper';

type props = StackScreenProps<HomeStackPrams,'Listen'>;
export default ({navigation,route}:props) => {
  /**
   * ! google speak to text
   * ! load image to text
   */
  return (
    <Warper title={I18n.t(route.name)}>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Soon listen mod
        </Text>
        <Button
          accessoryLeft={<Icon name="home" />}
          style={styles.likeButton}
          onPress={() => navigation.goBack()}>
          Go back
        </Button>
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
