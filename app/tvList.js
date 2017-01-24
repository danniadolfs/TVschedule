// app/tvList.js

'use strict';

import { Actions } from 'react-native-router-flux'; // New code

var React = require('react');
var ReactNative = require('react-native');
var {
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
} = ReactNative;

var REQUEST_URL = 'http://apis.is/tv/';

var tvList = React.createClass({
  statics: {
    title: '<ListView>',
    description: 'Performant, scrollable list of data.'
  },

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

  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
          Actions.tv_channel;
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
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
    return (
      <TouchableHighlight onPress={() => Actions.tv_channel()}>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{tv.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      ></View>
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