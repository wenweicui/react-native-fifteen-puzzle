import React, { Component } from "react";
import { StatusBar, View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, Dimensions, TouchableHighlight,Modal, findNodeHandle } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import CountdownCircle from 'react-native-countdown-circle'
import { BlurView, VibrancyView } from 'react-native-blur';
import Game from '../game/Game'
import Steps from ".././img/footsteps.png"
import screen from ".././img/screenshot.png"
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class RigidBodies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      gameReset: false,
      stopwatchReset: false,
      modalVisible: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }
  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }

  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true, gameReset:true});
  }

  componentWillReceiveProps() {
    this.setState({gameReset:false});
  }
  getFormattedTime(time) {
      this.currentTime = time;
  };

  render() {
    const { width, height } = Dimensions.get("window");
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);
    let mode = this.props.navigation.state.params.mode;
    const {goBack} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <Modal
            visible={this.state.modalVisible}
            onRequestClose={() => this.closeModal()}
            transparent={true}
        >
          <View style={styles.modalContainer}>
            <Image
              source={screen}
              style={styles.absolute}
              blurRadius={20}
            />
              <CountdownCircle
                seconds={3}
                radius={70}
                borderWidth={15}
                color="#F76D6D"
                shadowColor="#fbc4c4"
                bgColor="#fff"
                textStyle={{ fontSize: 40,color:'#de6262'}}
                onTimeElapsed={() => {this.closeModal(); this.toggleStopwatch()}}
              />
          </View>
        </Modal>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <View style={{flex:1}}>
          <View style={{flexDirection:'row'}}>
            <Stopwatch laps msecs start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              options={styles}
              getTime={this.getFormattedTime} />
            <View style={styles.stepContainer}>
              <Image style={styles.stepImg} source={Steps} />
              <Text style={styles.stepText}>0</Text>
            </View>
          </View>
          <View style={{backgroundColor:'#fff',height:SCREEN_WIDTH}}>
            <Game gameReset={this.state.gameReset} gameMode={mode}/>
          </View>
          <View style={{flexDirection:'row',backgroundColor:'green',flex:1}}>
            <TouchableHighlight
              onPress={!this.state.gameReset ? this.resetStopwatch : () => goBack()}
              style={[!this.state.gameReset ? {backgroundColor:'#505050'} : {backgroundColor:'#767676'},{flex:1,alignItems:'center',justifyContent:'center'}]}
              activeOpacity={0.8}
              underlayColor={'#404040'}>
              <View>
                <Text style={styles.btnText}>{!this.state.gameReset ? 'RETRY' : 'GIVE UP'}</Text>
                {!this.state.gameReset ?
                <Text style={styles.btnTextSmall}>CHANCE: 1</Text>
                : null}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                !this.state.stopwatchStart?
                  this.openModal()
                :
                  this.toggleStopwatch()
              }}
              style={{flex:1,backgroundColor:'#F76D6D',alignItems:'center',justifyContent:'center'}}
              activeOpacity={0.8}
              underlayColor={'#ac4c4c'}>
              <Text style={styles.btnText}>{!this.state.stopwatchStart ? "START" : "DONE"}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");
const styles = {
  container: {
    backgroundColor: '#F76D6D',
    width:280,
    padding: 15,
    paddingTop:30,
    alignItems:'center'
  },
  text: {
    fontFamily: 'Silom',
    fontSize: 40,
    color: '#FFF',
    marginLeft: 7,
  },
  btnText: {
    fontFamily: 'Silom',
    fontSize: 40,
    color:'white',
    padding:20
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
  },
  modalContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextSmall: {
    textAlign:'center',
    fontFamily: 'Silom',
    fontSize: 20,
    color:'white',
  },
  stepContainer: {
    flex:1,
    backgroundColor:'#505050',
    alignItems:'center',
    justifyContent:'center',
    padding:15,
    paddingTop:30,
    flexDirection:'row'
  },
  stepText: {
    alignItems:'center',
    fontFamily: 'Silom',
    fontSize: 30,
    color:'white',
  },
  stepImg: {
    width:24,
    height:24,
    marginRight:10,
    marginBottom:3
  }
};
