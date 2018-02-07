import React, { Component } from "react";
import { StatusBar, View, StyleSheet, ScrollView, Image, Text, TouchableOpacity,Dimensions } from "react-native";
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
import Logo from "./images/logo.png"
import GameView from "./gameView";
const SCREEN_WIDTH = Dimensions.get('window').width;
import {
  StackNavigator,
} from 'react-navigation';

export default class TableOfContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: "fadeInRight"
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

    return (
      <LinearGradient
        colors={["#F76D6D", "#844545"]}
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
          <StatusBar hidden={false} barStyle={"light-content"} />

          <View style={css.container}>

            <Image style={css.logo} source={Logo} />
            <View
              style={[
                css.headingContainer,
                { marginLeft: backButton ? -50 : 0 }
              ]}
            >

              {backButton}

            </View>
            <Animatable.View
              style={{backgroundColor:'transparent', alignItems: "center",marginBottom:'10%'}}
              animation={this.state.animation}
            >
              <Text style={[css.userDetail,css.borde]}>Welcome back, William</Text>
              <Text style={css.userDetail}>Your Today’s Global Rank is</Text>
              <Text style={[css.userDetail,css.borde]}>#10292</Text>
            </Animatable.View>

            <TouchableOpacity
              style={css.circle}
              onPress={() =>
                this.props.navigation.navigate('GameView', {mode:3})
            }>
              <Text style={css.circleText}>Beginner 3X3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={css.circle}
              onPress={() =>
                this.props.navigation.navigate('GameView', {mode:4})
            }>
              <Text style={css.circleText}>Intermediate 4X4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={css.circle}
              onPress={() =>
                this.props.navigation.navigate('GameView', {mode:5})
            }>
              <Text style={css.circleText}>Advance 5X5</Text>
            </TouchableOpacity>
          </View>

        </GameEngine>

      </LinearGradient>
    );
  }
}

const css = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  logo: {
    marginTop: "20%",
    marginBottom: "5%"
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%"
  },
  headingContainer: {
    alignItems: "center",
    marginTop: "4%",
    alignSelf: "center",
    flexDirection: "row"
  },
  userDetail: {
    color:'white',
    fontSize:22,
    fontWeight:'300',
    marginTop:"3%"
  },
  borde: {
    fontWeight:"500"
  },
  circle: {
    backgroundColor:'transparent',
    width: SCREEN_WIDTH - 100,
    padding:10,
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:100,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleText: {
    color:'#fff',
    fontSize:25
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
      header:null,
    }
  },
});
module.exports = appNavigator;
