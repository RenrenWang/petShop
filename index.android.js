/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import  Setup from './js/setup.js'
import SplashScreen from 'react-native-splash-screen'
export default class petShop extends Component {

  render() {
    return  <Setup/>
    
  }
}



AppRegistry.registerComponent('petShop', () => petShop);
