// app/tvChannel.js

'use strict';

import { Actions } from 'react-native-router-flux';
import {tvList} from './tvList';

var React = require('react');
var ReactNative = require('react-native');
var {
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var REQUEST_URL = 'http://apis.is';

var tvChannel = React.createClass({
  statics: {
    title: 'Channel', //TODO: Add channel names (this.props.chEnd)
    description: 'Channel schedule'
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

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
          renderRow={this.renderChannel}
        ></ListView>
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
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

  //Handle the REST request
  //TODO: Move utility function into seperate file
  fetchData: function() {
    fetch(REQUEST_URL+this.props.chEnd)
      .catch((error) => {
        console.error(error);
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
        });
      })
      .done();
  },

  //Render channel schedule
  renderChannel: function(tv) {
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.startTime}>{String(tv.startTime).substring(10, 16)} </Text>
            <Text style={styles.title}> {tv.title} </Text>
            <Text style={styles.duration}>Lengd(hh:mm): {tv.duration} </Text>
          </View>
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
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
    title: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
    paddingTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  duration: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 5,
  },
  startTime: {
    color: 'green',
    paddingTop: 5,
    textAlign: 'center',
  },

});

module.exports = tvChannel;