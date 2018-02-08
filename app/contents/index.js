import React, { Component } from "react";
import { StatusBar, View, StyleSheet, ScrollView, Image, Text, TouchableOpacity,Dimensions, Animated } from "react-native";
import { GameEngine } from "react-native-game-engine";
import {
  SpawnParticles,
  Gravity,
  Wind,
  Sprinkles,
  Motion,
  DegenerateParticles
} from "./systems";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import Logo from "./images/logo2.png";
import Icon3 from "./images/icon3.png";
import Icon4 from "./images/icon4.png";
import Icon5 from "./images/icon5.png";
import GameView from "./gameView";
const SCREEN_WIDTH = Dimensions.get('window').width;
import {
  StackNavigator,
} from 'react-navigation';

const HEADER_SCROLL_DISTANCE = 36;
const HEADER_SCROLL_DISTANCE_MAX = 73;

export default class TableOfContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    let backButton = this.state.parent
      ? <BackButton
          key={"back"}
          ref={"back"}
          onPress={this.onBackPress}
          animation={"fadeInLeft"}
        />
      : null;
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0,HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const headerBorder = this.state.scrollY.interpolate({
      inputRange: [0,HEADER_SCROLL_DISTANCE_MAX/2,HEADER_SCROLL_DISTANCE_MAX],
      outputRange: [0,0,1],
      extrapolate: 'clamp',
    });
    return (
      <LinearGradient
        colors={["#1CD8D2", "#93EDC7"]}
        style={css.linearGradient}
      >

        <GameEngine
          ref={"engine"}
          running={!this.props.sceneVisible}
          systems={[
            SpawnParticles,
            Gravity,
            Wind,
            Sprinkles,
            Motion,
            DegenerateParticles
          ]}
        >
          <Animated.ScrollView
            bounces={false}
            style={{backgroundColor:'transparent'}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
             [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
           )}
          >
            <StatusBar hidden={false} barStyle={"light-content"} />
            <View style={css.container}>
              <View style={css.logoContainer}>
                <Image style={css.logo} source={Logo} />
                <Text style={css.logoText}>Fifteen Puzzle</Text>
              </View>
              <Animatable.View
                style={css.headingContainer}
                animation='bounceInDown'
              >
                <Text style={[css.userDetail,css.borde]}>Welcome back, William</Text>
                <Text style={css.userDetail}>Your Today’s Global Rank is</Text>
                <Text style={[css.userDetail,css.borde]}>#10292</Text>
              </Animatable.View>
              <Animatable.View animation='bounceInUp'>
                <TouchableOpacity
                  style={[css.card, {backgroundColor:'#52B3D9'}]}
                  onPress={() =>
                    this.props.navigation.navigate('GameView', {mode:3})
                }>
                  <View style={css.cardTextContainer}>
                    <Text style={css.cardTextBold}>3X3</Text>
                    <Text style={css.cardText}>Beginner</Text>
                  </View>
                  <View>
                    <Image style={css.icon} source={Icon3} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[css.card, {backgroundColor:'#fac65f'}]}
                  onPress={() =>
                    this.props.navigation.navigate('GameView', {mode:4})
                }>
                  <View style={css.cardTextContainer}>
                    <Text style={css.cardTextBold}>4X4</Text>
                    <Text style={css.cardText}>Intermediate</Text>
                  </View>
                  <View>
                    <Image style={css.icon} source={Icon4} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[css.card, {backgroundColor:'#fb8390'}]}
                  onPress={() =>
                    this.props.navigation.navigate('GameView', {mode:5})
                }>
                  <View style={css.cardTextContainer}>
                    <Text style={css.cardTextBold}>5X5</Text>
                    <Text style={css.cardText}>Advanced</Text>
                  </View>
                  <View>
                    <Image style={css.icon} source={Icon5} />
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </Animated.ScrollView>
        </GameEngine>
      </LinearGradient>
    );
  }
}

const css = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    marginTop: 40,
    flexDirection:'row',
    alignItems: "center",
  },
  logo: {
    width:50,
    height:50
  },
  logoText: {
    color:'#fff',
    fontFamily:'Silom',
    fontSize:30,
    paddingLeft:20
  },
  headingContainer: {
    alignItems: "center",
    marginTop:10,
    marginBottom: 15,
    alignSelf: "center",
  },
  userDetail: {
    color:'white',
    fontSize:22,
    fontWeight:'300',
    marginTop:5,
  },
  borde: {
    fontWeight:"500"
  },
  card: {
    backgroundColor:'transparent',
    width: SCREEN_WIDTH - 40,
    paddingVertical:15,
    paddingHorizontal:25,
    borderRadius:20,
    marginBottom: 20,
    flexDirection:"row",
    justifyContent: 'space-between'
  },
  cardText: {
    color:'#fff',
    fontWeight:'400',
    fontSize:24
  },
  cardTextBold: {
    color:'#fff',
    fontWeight:'400',
    fontSize:36
  },
  cardTextContainer: {
    paddingTop:10
  }
});

const appNavigator = StackNavigator({
  Home: {
    screen: TableOfContents,
    navigationOptions: {
      header:null,
    }
   },
  GameView: {
    screen: GameView,
    navigationOptions: {
      gesturesEnabled: false,
      header:null,
    }
  },
});
module.exports = appNavigator;
