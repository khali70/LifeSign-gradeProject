import React from 'react';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {AppNavigator} from './Navigation/Navigation';
import { Provider } from 'react-redux';
import store from './Redux/store';

export default ({}): React.ReactElement => {
  return (
    <>
      <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <AppNavigator />
      </ApplicationProvider>
      </Provider>
    </>
  );
};
/* 
Theme = {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string; // header background color
        text: string; // text color 
        border: string;
        notification: string;
    };
};
*/
