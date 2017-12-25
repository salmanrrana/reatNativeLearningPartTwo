import React, { Component } from 'react';
import { View, Animated,
  PanResponder, Dimensions, LayoutAnimation,
  UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.5 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;


class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props){
    super(props);

    // onStartShouldSetPanResponder: executed anytime a user taps on the screen
    // onPanResponderMove: executed anytime a user drags/move their finger across the screen
    // first argument event(usually called first as what element was pressed down on)
    // gesture lets us know what pixel value is being pressed on and how quickly its moving around
    // usually we care about the data that is being given by gesture
    // onPanResponderRelease: executed anytime a user presses down and then
    // lets go/removes finger from screen
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture);
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD){
          //console log
          console.log('SWIPE RIGHT!!');
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left!');
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  //this only comapres to see if it is the same exact array of object that are rendered
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 })
    }
  }

  //UIManager is being used here for compatibility issues for android purposes
  //if this function exists then call it with a value of true
  //layoutAnimation.spring() is for the state to have that spring
  componentWillUpdate(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
// this function will reset (w/ a spring) the position of the card to normal
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

// this funtion will make the card go off the screen if swiped a certain distance
  forceSwipe(direction) {
    //made this 1.2 so it would go off of the screen all the way and not have a corner peeking out
    const x = direction === 'right' ? SCREEN_WIDTH * 1.2: -SCREEN_WIDTH * 1.2;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

// this is a helper funtion for forceSwipe()
// this takes the info from that fuction and will log if it is swiped right or onSwipeLeft
// if props not passed from parent compoenet than we have defaultProps set at the top of this compoenet
// we are not modifying the existing value, we are resetting the state with setState
// we need to forcibly reset the value of the position with the setValue.
// by doing this, it resets the position object for the next card in the list.
// this would prevent the next card from going into the position where we swiped the Card
// off of the screen
  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item): onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 })

  }

//this funtion is in control of the animation/rotation of the card
//depending on the swiping to left(-SCREEN_WIDTH) or to the right (SCREEN_WIDTH)
//it will move the image -120 deg or 120 deg
  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.75,0,SCREEN_WIDTH * 1.75],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  // this funtion will let the app know which card to animate
  // by using ... we are taking all different callbacks that exist and pass off to view
  // i is the index of the item within the array of cards provided(this.props.data)
  // this.state.index is the current card that we are attempting to consider
  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards()
    }

    return this.props.data.map((item, i)=> {
      // if these cards have already been swiped just return null
      if (i < this.state.index) { return null; }
      // if i is equal to the state.index render the card and styling and position for that cards
      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
      //if you remove this line below: the cards appear one at a time
      return (
        //this animated.view  below is controlling all the cards behind the card that is showing.
        //the top style is moving the card down by 10 times the difference between
        // i(the individual item position) subtracted by this.state.index(the number of cards away that it is from being on top of the deck)
        // in order for the cards to move up along when the cards get swiped left and right
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  render () {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
}

export default Deck;
