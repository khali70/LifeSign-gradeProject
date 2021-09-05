import React from 'react';

import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Listen} from '../Screens';

const HomeStack = createStackNavigator<HomeStackPrams>();
const HomeStackNavigator: React.FC<{}> = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Listen" component={Listen} />
  </HomeStack.Navigator>
);

export const AppNavigator: React.FC<{theme?: Theme}> = ({theme}) => (
  <NavigationContainer theme={theme}>
    <HomeStackNavigator />
  </NavigationContainer>
);
