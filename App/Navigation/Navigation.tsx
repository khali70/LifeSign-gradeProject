import React from 'react';

import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, About, Listen, Help, Speak, Bluetooth} from '../Screens';

const HomeStack = createStackNavigator<HomeStackPrams>();
const HomeStackNavigator: React.FC<{}> = () => (
  <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Home">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Listen" component={Listen} />
    <HomeStack.Screen name="About" component={About} />
    <HomeStack.Screen name="Help" component={Help} />
    <HomeStack.Screen name="Speak" component={Speak} />
    <HomeStack.Screen name="Bluetooth" component={Bluetooth} />
  </HomeStack.Navigator>
);

export const AppNavigator: React.FC<{theme?: Theme}> = ({theme}) => (
  <NavigationContainer theme={theme}>
    <HomeStackNavigator />
  </NavigationContainer>
);
