import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';



export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen},
      auth: { screen: AuthScreen},
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: {
                screen: ReviewScreen,
                navigationOptions:({ navigation }) => ({
                  headerRight: (
                    <Button
                      title="Settings"
                      onPress={() => navigation.navigate('settings')}
                      backgroundColor="rgba(0,0,0,0)"
                      color="rgba(0,122,255,1)"
                    />
                  ),
                  style:{
                    marginTop: Platform.OS === 'android' ? 24 : 0,
                  },
                  headerTitle: <Text>Review</Text>
                }),
               },
                settings: { screen: SettingsScreen },
              })
            }
          })
        }
      });

    return <MainNavigator />;
  }
}


// export default class App extends React.Component {
//   render() {
//     const MainNavigator = TabNavigator({
//       welcome: { screen: WelcomeScreen},
//       auth: { screen: AuthScreen},
//       main: {
//         screen: TabNavigator({
//           map: { screen: MapScreen },
//           deck: { screen: DeckScreen },
//           review: {
//             screen: StackNavigator({
//               review: {
//                 screen: ReviewScreen,
//                 navigationOptions: ({ navigation }) => ({
//                   headerRight: <Button
//                     title="Settings"
//                     onPress={() => navigation.navigate('settings')}
//                   />,
//                   headerTitle: <Text>Review</Text>,
//                }),
//               settings: { screen: SettingsScreen },
//             },
//           },
//         }),
//       }),
//     }
//   }),
// )}
