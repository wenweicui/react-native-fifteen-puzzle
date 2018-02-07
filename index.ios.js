import React, { Component } from "react";
import { AppRegistry, View, Modal } from "react-native";

import Index from "./app/contents/index";

export default class RNGEHandbook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Index />
      </View>
    );
  }
}

AppRegistry.registerComponent('RNGEHandbook', () => RNGEHandbook);
