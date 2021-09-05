import React from 'react';
import {Divider, TopNavigation} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {Info, LeftIcon} from './Header';
type props = {title: string; root?: boolean};
const Warper: React.FC<props> = ({children, title, root = false}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={!root ? <LeftIcon /> : undefined}
        accessoryRight={root ? <Info /> : undefined}
      />
      <Divider />
      {children}
    </SafeAreaView>
  );
};
export default Warper;
