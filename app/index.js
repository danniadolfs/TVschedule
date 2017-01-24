// app/index.js

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import tvList from './tvList';
import tvChannel from './tvChannel';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="tv_list"
          component={tvList}
          title="Channels"
          sceneStyle={{paddingTop: 50}}
          initial
        ></Scene>
        <Scene
          key="tv_channel"
          component={tvChannel}
          sceneStyle={{paddingTop: 50}}
        ></Scene>
      </Scene>
    </Router>
  );
}

export default App