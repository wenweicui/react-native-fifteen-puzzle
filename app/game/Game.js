var React = require('react');
var GameBoard = require('./GameBoard');
var GameHelpers = require('./GameHelpers');
var Modal = require('./Modal');

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

var Game = React.createClass({

  propTypes: {
    gameMode: React.PropTypes.number.isRequired,
    gameReset: React.PropTypes.bool.isRequired,
  },

  getInitialState: function() {
    return {
      indexes: GameHelpers.getShuffledIndexes(this.props.gameMode),
      tilesVisible: false,
    };
  },

  componentDidMount: function() {
    this.setState({tilesVisible: true}); // eslint-disable-line react/no-did-mount-set-state
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.props.gameReset && nextProps.gameReset) {
      this.onNewGame()
    }
  },

  onNewGame: function() {
    this.setState({
      tilesVisible: false,
    });
    setTimeout(() => {
      this.setState({
        indexes: GameHelpers.getShuffledIndexes(this.props.gameMode),
      }, () => this.setState({tilesVisible: true}));
    }, 200 + 20 * 15); // animation length + delay of each tile
  },

  onMoved: function(moveFrom, moveTo) {
    var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.state.indexes, this.props.gameMode);
    indexesMatrix[moveTo.y][moveTo.x] = indexesMatrix[moveFrom.y][moveFrom.x];
    indexesMatrix[moveFrom.y][moveFrom.x] = null;
    this.setState({
      indexes: GameHelpers.getIndexesFromMatrix(indexesMatrix),
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainArea}>
          <GameBoard
            boardSize={this.props.gameMode}
            indexes={this.state.indexes}
            onMoved={this.onMoved}
            tilesVisible={this.state.tilesVisible}/>
        </View>

        <Modal isOpen={GameHelpers.isWon(this.state.indexes, this.props.gameMode)} style={{zIndex:999}}>
          <View style={styles.wonDialog}>
            <Text style={styles.header}>Hooray!</Text>
            <Text style={styles.header2}>Once again?</Text>
            <TouchableOpacity onPress={this.onNewGame}>
              <View style={styles.buttonWrapper}>
                <Text style={styles.button}>Play again</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  headerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomArea: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 15,
  },
  header2: {
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
  },
  help: {
    opacity: 0.7,
  },
  wonDialog: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  buttonWrapper: {
    backgroundColor: '#FF3366',
    height: 55,
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

module.exports = Game;
