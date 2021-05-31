//This is an example of Tinder like Swipeable Card//
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux'
//import react in our code.

import {Text, Dimensions, Animated, PanResponder,StyleSheet, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.

const SCREEN_WIDTH = Dimensions.get('window').width;

export class SwipeableCard extends Component {
    constructor() {
        super();
        this.panResponder;
        this.state = {
          Xposition: new Animated.Value(0),
          RightText: false,
          LeftText: false,
          counter:1,
        };
    
        this.Card_Opacity = new Animated.Value(1);
      }
    
      componentWillMount() {
        this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => false,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
          onPanResponderMove: (evt, gestureState) => {
            this.state.Xposition.setValue(gestureState.dx);
            if (gestureState.dx > SCREEN_WIDTH - 250) {
              this.setState({
                RightText: true,
                LeftText: false,
              });
            } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
              this.setState({
                LeftText: true,
                RightText: false,
              });
            }
          },
    
          onPanResponderRelease: (evt, gestureState) => {
            if (
              gestureState.dx < SCREEN_WIDTH - 150 &&
              gestureState.dx > -SCREEN_WIDTH + 150
            ) {
              this.setState({
                LeftText: false,
                RightText: false,
              });
              Animated.spring(
                this.state.Xposition,
                {
                  toValue: 0,
                  speed: 5,
                  bounciness: 10,
                },
                { useNativeDriver: true }
              ).start();
            } else if (gestureState.dx > SCREEN_WIDTH - 150) {
              Animated.parallel(
                [
                  Animated.timing(this.state.Xposition, {
                    toValue: SCREEN_WIDTH,
                    duration: 200,
                  }),
    
                  Animated.timing(this.Card_Opacity, {
                    toValue: 0,
                    duration: 200,
                  }),
                ],
                { useNativeDriver: true }
              ).start(() => {
                this.setState({ LeftText: false, RightText: false }, () => {
                  this.props.removeCard();
                });
              });
            } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
              Animated.parallel(
                [
                  Animated.timing(this.state.Xposition, {
                    toValue: -SCREEN_WIDTH,
                    duration: 200,
                  }),
    
                  Animated.timing(this.Card_Opacity, {
                    toValue: 0,
                    duration: 200,
                  }),
                ],
                { useNativeDriver: true }
              ).start(() => {
                this.setState({ LeftText: false, RightText: false }, () => {
                  this.props.removeCard();
                });
              });
            }
          },
        });
      }

      addJodoh(){
          if(this.state.counter === 1){
            this.setState({counter:0})
            axios.post('http://386f073a02f0.ngrok.io/jodoh/',{
                iduser:this.props.dataUser,
                idjodoh:this.props.item
            })
            .then((response)=>{
                alert(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    
          }
      }
    
      render() {
        const rotateCard = this.state.Xposition.interpolate({
          inputRange: [-200, 0, 200],
          outputRange: ['-20deg', '0deg', '20deg'],
        });
    
        return (
            
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[
              styles.card_Style,
              {
                opacity: this.Card_Opacity,
                transform: [
                  { translateX: this.state.Xposition },
                  { rotate: rotateCard },
                ],
              },
            ]}>
            <Image style={styles.card_Style}
                            source={{uri:`http://386f073a02f0.ngrok.io/user/image/${this.props.item.image}`}}
                        />
            <Text style={styles.Card_Title}> {this.props.item.name} </Text>
    
            {this.state.LeftText ? this.addJodoh() : null}
    
            {this.state.RightText ? (
              <Text style={styles.Right_Text_Style}> Right Swipe </Text>
            ) : null}
          </Animated.View>
          
        );
      }
}

const mapStateToProps = (state) => ({
    dataUser:state.LoginReducer.dataUser
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeableCard)

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
  
    card_Style: {
      width: '75%',
      height: '45%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 7,
    },
  
    Card_Title: {
      color: '#fff',
      fontSize: 24,
    },
  
    Left_Text_Style: {
      top: 22,
      right: 32,
      position: 'absolute',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
  
    Right_Text_Style: {
      top: 22,
      left: 32,
      position: 'absolute',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
  });
  