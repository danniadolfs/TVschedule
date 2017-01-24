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

var REQUEST_URL = 'http://apis.is/tv/'; //url to json file
var chEnd = '/tv/ruv'; //Default channel selection

var tvList = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  //
  componentWillMount: function() {
  },

  //Data has been procced
  componentDidMount: function() {
    this.fetchData();
  },

  //Render List to populate.
  render: function() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderTv}
        ></ListView>
    );
  },

  //Handle the REST request
  fetchData: function() {
    fetch(REQUEST_URL)
      .catch((error) => {
        console.error(error);
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results[0].channels),
          loaded: true,
        });
      })
      .done();
  },

  //Render Channel list from the REST request
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