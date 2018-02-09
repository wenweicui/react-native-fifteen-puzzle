import React, { Component } from "react";
import { StatusBar, View, StyleSheet, ScrollView, Image, Text, TouchableOpacity,Dimensions, Animated, Modal } from "react-native";
import { GameEngine } from "react-native-game-engine";
import {
  SpawnParticles,
  Gravity,
  Wind,
  Alert,
  Sprinkles,
  Motion,
  DegenerateParticles
} from "./systems";
import LottieView from 'lottie-react-native';
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import Logo from "./images/logo2.png";
import Icon3 from "./images/icon3.png";
import Icon4 from "./images/icon4.png";
import Icon5 from "./images/icon5.png";
import RightArrow from "./images/right-arrow.png";
import Rank from "./images/ranking.png";
import GameView from "./gameView";
import Leaderboard from 'react-native-leaderboard';
import { ButtonGroup } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;
var InteractionManager = require('InteractionManager');
import backIcon from "./images/back_white.png";
import {
  StackNavigator,
} from 'react-navigation';

export default class LeaderBoard extends Component {
  _isMounted: boolean;

  constructor(props) {
    super(props);
    this.state = {
        globalData: [
            { name: 'We Tu Lo', score: null, iconUrl: 'https://api.adorable.io/avatars/285/abott@adorable.png' },
            { name: 'Adam Savage', score: 12, iconUrl: 'https://api.adorable.io/avatars/285/.png' },
            { name: 'Derek Black', score: 244, iconUrl: 'https://api.adorable.io/avatars/285/13.png' },
            { name: 'Erika White', score: 0, iconUrl: 'https://api.adorable.io/avatars/285/123.png' },
            { name: 'Jimmy John', score: 20, iconUrl: 'https://api.adorable.io/avatars/285/1234.png' },
            { name: 'Joe Roddy', score: 69, iconUrl: 'https://api.adorable.io/avatars/285/1235.png' },
            { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://api.adorable.io/avatars/285/123123.png' },
            { name: 'Tim Thomas', score: 41, iconUrl: 'https://api.adorable.io/avatars/285/12332.png' },
            { name: 'John Davis', score: 80, iconUrl: 'https://api.adorable.io/avatars/285/123121.png' },
            { name: 'Tina Turner', score: 22, iconUrl: 'https://api.adorable.io/avatars/285/123423.png' },
            { name: 'Harry Reynolds', score: null, iconUrl: 'https://api.adorable.io/avatars/285/1234443.png' },
            { name: 'Betty Davis', score: 25, iconUrl: 'https://api.adorable.io/avatars/285/1231523.png' },
            { name: 'Lauren Leonard', score: 30, iconUrl: 'https://api.adorable.io/avatars/285/1235464.png' },
        ],
        friendData: [
            { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
            { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
            { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
        ],
        selectedIndex: 0,
        userRank: 1,
        user: {
            name: 'Joe Roddy',
            score: 69,
        },
        loaded: false,
    }
  }
  componentDidMount() {
    this._isMounted = true;
    InteractionManager.runAfterInteractions(() => {
      this._isMounted && this.setState({loaded: true});
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  alert = (title, body) => {
        Alert.alert(
            title, body, [{ text: 'OK', onPress: () => { } },],
            { cancelable: false }
        )
    }

    sort = (data) => {
        const sorted = data && data.sort((item1, item2) => {
            return item2.score - item1.score;
        })
        let userRank = sorted.findIndex((item) => {
            return item.name === this.state.user.name;
        })
        this.setState({ userRank: ++userRank });
        return sorted;
    }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
          <View style={{flex: 1, marginTop: (SCREEN_WIDTH / 2 - 50),alignItems: 'center',}}>
            <View style={{width: 250, height: 250,}}>
              <LottieView
                ref={animation => { this.animation = animation; }}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor:'transparent'
                }}
                source={require('.././lottie/newAnimation.json')}
                loop
              />
            </View>
           </View>
      </View>
    );
  }

  renderHeader() {
      const {goBack} = this.props.navigation;
        return (
            <View colors={['#1da2c6', '#1695b7']}
                style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                  <TouchableOpacity onPress={() => goBack()}>
                    <Image style={{alignSelf:'center',marginTop:5}} source={backIcon}/>
                  </TouchableOpacity>
                  <Text style={{fontSize: 25, color: 'white', }}>Leaderboard</Text>
                  <View style={{}}/>
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 15, marginTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                        {ordinal_suffix_of(this.state.userRank)}
                    </Text>
                    <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' }} />
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                        {this.state.user.score}pts
                    </Text>
                </View>
                <ButtonGroup
                    onPress={(x) => { this.setState({ selectedIndex: x }) }}
                    selectedIndex={this.state.selectedIndex}
                    buttons={['Global', 'Friends']}
                    containerStyle={{ height: 30 }} />
            </View>
        )
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

   const props = {
        labelBy: 'name',
        sortBy: 'score',
        data: this.state.selectedIndex > 0 ? this.state.friendData : this.state.globalData,
        icon: 'iconUrl',
        onRowPress: (item, index) => { this.alert(item.name + " clicked", item.score + " points, wow!") },
        sort: this.sort
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white', }}>
        {this.renderHeader()}
        <Leaderboard {...props} />
      </View>
    );
  }
}

const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#1CD8D2'
  },
});
