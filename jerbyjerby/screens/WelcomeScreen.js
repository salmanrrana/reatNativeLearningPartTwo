import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Word of Mouth', color: '#181F1C'},
  { text: 'Swipe through a list of shows', color: '#274029'},
  { text: 'Find a show you like, swipe right', color: '#315C2B'},
  { text: 'Find a show you dont like, swipe left', color: '#9EA93F'},
  { text: 'Wanna tell people about a show?', color: '#60712F'},
  { text: 'Add a show, it\'ll get reviewed and added!', color: '#9EA93F'}
];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
}

export default WelcomeScreen;
