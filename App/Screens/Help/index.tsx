import React from 'react';

import {Linking, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import I18n from '@i18n';
import Warper from '@components/HeaderWarper';

export default () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'About'>>();
  return (
    <Warper title={I18n.t('Listen')}>
      <Layout style={styles.container}>
        <Button
          style={[styles.btn, styles.helpBtn]}
          appearance="outline"
          status="basic"
          accessoryLeft={<Icon name="phone" />}
          onPress={() => Linking.openURL(`tel:911`)}>
          call 911
        </Button>
        <Button
          style={[styles.btn, styles.helpBtn]}
          accessoryLeft={<Icon name="pin" />}
          appearance="outline"
          status="basic"
          onPress={() => Linking.openURL('geo:0,0?q=hospitals')}>
          hospitals
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
  btn: {
    marginVertical: 16,
  },
  helpBtn: {
    flex: 1,
    minWidth: 200,
  },
});
