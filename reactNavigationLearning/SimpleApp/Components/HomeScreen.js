import React from 'react';
import { View, Text, Button } from 'react-native';
// import { TabNavigator } from 'react-navigation';
// import RecentChatsScreen from './RecentChatsScreen';
// import AllContactsScreen from './AllContactsScreen';


// const MainScreenNavigator = TabNavigator({
//   Recent: { screen: RecentChatsScreen },
//   All: { screen: AllContactsScreen},
// });


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Gryzzl',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Steve' })}
          title="Chat with Steve"
        />
      </View>
    )
  }
}

export default HomeScreen;
