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
        style={styles.linearGradient}
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
          <View
            style={{backgroundColor:'transparent'}}
          >
            <StatusBar hidden={false} barStyle={"light-content"} />
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={Logo} />
                <View>
                  <Text style={styles.logoText}>Fifteen Puzzle</Text>
                  <Text style={styles.logoTextSmall}>Powered by Wenwei Cui</Text>
                </View>
              </View>
              <Animatable.View
                style={styles.headingContainer}
                animation='bounceInDown'
              >
                <Text style={[styles.userDetail,styles.borde]}>Welcome back, William</Text>
              </Animatable.View>
              <Animatable.View animation='bounceInUp'>
                <TouchableOpacity
                  style={[styles.card, {backgroundColor:'#52B3D9'}]}
                  onPress={() =>
                    this.props.navigation.navigate('GameView', {mode:3})
                }>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTextBold}>3X3</Text>
                    <Text style={styles.cardText}>Beginner</Text>
                  </View>
                  <View>
                    <Image style={styles.icon} source={Icon3} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.card, {backgroundColor:'#fac65f'}]}
                  onPress={() =>
                    this.props.navigation.navigate('GameView', {mode:4})
                }>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTextBold}>4X4</Text>
                    <Text style={styles.cardText}>Intermediate</Text>
                  </View>
                  <View>
                    <Image style={styles.icon} source={Icon4} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.card, {backgroundColor:'#fb8390'}]}
                  onPress={() =>
                    this.props.navigation.navigate('GameView', {mode:5})
                }>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTextBold}>5X5</Text>
                    <Text style={styles.cardText}>Advanced</Text>
                  </View>
                  <View>
                    <Image style={styles.icon} source={Icon5} />
                  </View>
                </TouchableOpacity>
                <View style={styles.rankContainer}>
                  <Text style={[styles.userDetail,styles.borde]}>Your Today’s Global Rank </Text>
                </View>
              </Animatable.View>
            </View>
          </View>
        </GameEngine>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize:32,
    paddingLeft:20
  },
  logoTextSmall: {
    color:'#fff',
    fontFamily:'Silom',
    fontSize:16,
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
    fontWeight:'400',
    marginTop:5,
  },
  borde: {
    fontWeight:"600"
  },
  underLine: {
    textDecorationLine: 'underline'
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
  },
  rankContainer: {
    alignSelf: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
    backgroundColor:'#d593bb',
    padding:15,
    paddingTop:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingBottom: 30
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
