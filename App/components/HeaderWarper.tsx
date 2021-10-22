import React from 'react';
import {Divider, TopNavigation} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {RenderProp} from '@ui-kitten/components/devsupport';
type props = {
  title: string;
  root?: boolean;
  accessoryLeft?: RenderProp<{[key: string]: any}> | undefined;
  accessoryRight?: RenderProp<{[key: string]: any}> | undefined;
};
const Warper: React.FC<props> = ({
  children,
  title,
  accessoryLeft,
  accessoryRight,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={accessoryLeft}
        accessoryRight={accessoryRight}
      />
      <Divider />
      {children}
    </SafeAreaView>
  );
};
export default Warper;
