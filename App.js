/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { StatusBar, } from 'react-native'
import { Provider } from '@ant-design/react-native'
import Index from './app/pages/Index'

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
      StatusBar.setBarStyle('light-content');
      console.disableYellowBox = true;
      //console.ignoredYellowBox = ['Remote debugger is in a background tab which may cause apps to perform slowly.'];
  }
  render() {
    return (
      <Provider>
        <Index />
      </Provider>
    );
  }
}
