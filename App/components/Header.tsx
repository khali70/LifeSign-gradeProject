import React from 'react';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/core';

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
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={<Icon name="info-outline" />}
      onPress={() => alert('make About us screen')}
    />
  );
};
// settings-2-outline
