// app/tvList.js

'use strict';

import { Actions } from 'react-native-router-flux';

var React = require('react');
var ReactNative = require('react-native');
var {
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var REQUEST_URL = 'http://apis.is/tv/';
var chEnd = '/tv/ruv';

var tvList = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: name]: String}),

  componentWillMount: function() {
    this._pressData = {};
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderTv}
        ></ListView>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .catch((error) => {
        console.error(error);
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("data",responseData.results[0].channels);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results[0].channels),
          loaded: true,
        });
      })
      .done();
  },

  renderTv: function(tv) {
    const channelScene = () => {
      chEnd = tv.endpoint;
      console.log(chEnd);
      Actions.tv_channel({chEnd});
    }; 
    return (
      <TouchableHighlight onPress={channelScene}>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{tv.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
    title: {
    flex: 1,
    fontSize: 20,
    paddingTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});

module.exports = tvList;