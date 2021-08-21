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
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';

export default () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackPrams, 'Speak'>>();
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Speak" alignment="center" />
      <Divider />

      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Soon after Listen mode ...
        </Text>
        <Button style={styles.likeButton} onPress={() => navigation.goBack()}>
          Go Home
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
  likeButton: {
    marginVertical: 16,
  },
});
