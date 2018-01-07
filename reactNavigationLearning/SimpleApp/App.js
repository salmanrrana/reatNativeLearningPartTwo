import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './Components/HomeScreen';
import ChatScreen from './Components/ChatScreen';
// import RecentChatsScreen from './Components/RecentChatsScreen';
// import AllContactsScreen from './Components/AllContactsScreen';

const SimpleApp = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'My Chats',
    },
  },
  Chat: { screen: ChatScreen },
});

// const MainScreenNavigator = TabNavigator({
//   Recent: { screen: SimpleApp },
//   All: { screen: AllContactsScreen },
// });


export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
