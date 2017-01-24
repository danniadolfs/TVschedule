// app/index.js

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import tvList from './tvList';
import tvChannel from './tvChannel';
//import api from './source/tv_API';

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
          title="channel"
        ></Scene>
      </Scene>
    </Router>
  );
}

export default App