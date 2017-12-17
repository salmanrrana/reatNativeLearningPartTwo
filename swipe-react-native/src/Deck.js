import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder
} from 'react-native';

//onStartShouldSetPanResponder: executed anytime a user taps on the screen
// onPanResponderMove: executed anytime a user drags/move their finger across the screen
// first argument event(usually called first as what element was pressed down on)
// gesture lets us know what pixel value is being pressed on and how quickly its moving around
// usually we care about the data that is being given by gesture
//onPanResponderRelease: executed anytime a user presses down and then lets go/removes finger from screen

class Deck extends Component {
  constructor(props){
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture);
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: () => {}
    });

    this.state = {
      panResponder,
      position
    };
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-500,0,500],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  renderCards() {
    return this.props.data.map((item, index)=> {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      return this.props.renderCard(item)
    })
  }


  render () {
    return (
      //by using ... we are taking all different callbacks that exist and pass off to view
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

export default Deck;
