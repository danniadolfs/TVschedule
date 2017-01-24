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
  //TODO: Move utility function into seperate file
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
      Actions.tv_channel({chEnd});
    }; 
    return (
      <TouchableHighlight onPress={channelScene}>
        <View style={styles.container}>
            <Text style={styles.title}>{tv.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

/*---------------------------------
              STYLESHEET 
 ----------------------------------*/
var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: '#a9c1e8',
    flex: 1,
    fontSize: 20,
    paddingTop: 20,
    margin: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
});

module.exports = tvList;