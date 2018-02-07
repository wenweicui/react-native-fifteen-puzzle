var React = require('react');
import {
  StyleSheet,
  Text,
  Platform,
  } from "react-native";

var FontedText = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },
  render: function() {
    var {style, ...props} = this.props;
    return (
      <Text style={[Platform.OS === 'android' && styles.android, style]} {...props}>
        { this.props.children }
      </Text>
    );
  },
});

var styles = StyleSheet.create({
  android: {
    fontFamily: 'Silom',
  },
});

module.exports = FontedText;
