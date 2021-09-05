import React from 'react';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export const LeftIcon: React.FC<{name?: string}> = ({name}) => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={<Icon name="arrow-back-outline" />}
      onPress={() => navigation.goBack()}
    />
  );
};

export const Info = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackPrams>>();
  return (
    <TopNavigationAction
      icon={<Icon name="info-outline" />}
      onPress={() => navigation.push('About')}
    />
  );
};
// settings-2-outline
