import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
// import AuthScreen from './screens/AuthScreen';
// import AuthScreen from './screens/AuthScreen';



export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen},
      auth: { screen: AuthScreen},
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
        })
      }
    });

    return <MainNavigator />;
  }
}
