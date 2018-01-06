import React from 'react';
import { TabNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';

const RootTabs = TabNavigator({
  welcomescreen: {
    screen: WelcomeScreen,
  },
  authscreen: {
    screen: AuthScreen
  },
});

export default RootTabs;
