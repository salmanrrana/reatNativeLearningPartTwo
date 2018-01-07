import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';


export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen},
      auth: { screen: AuthScreen},
    });


    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}
