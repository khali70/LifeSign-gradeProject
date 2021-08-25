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
    useNavigation<StackNavigationProp<HomeStackPrams, 'Home'>>();
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Home" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Life Sign 😊
        </Text>
        <Button
          size="large"
          style={styles.likeButton}
          onPress={() => navigation.push('Listen')}>
          Listen
        </Button>
        <Button
          size="large"
          style={styles.likeButton}
          onPress={() => navigation.push('Speak')}>
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
  likeButton: {
    marginVertical: 16,
  },
});
