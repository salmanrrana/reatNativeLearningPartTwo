import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './Components/HomeScreen';
import ChatScreen from './Components/ChatScreen';
import RecentChatsScreen from './Components/RecentChatsScreen';
import AllContactsScreen from './Components/AllContactsScreen';

// export const MainScreenNavigator = TabNavigator({
//   Recent: { screen: RecentChatsScreen },
//   All: { screen: AllContactsScreen },
// });


export const SimpleApp = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Chat: { screen: ChatScreen },
});


export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
