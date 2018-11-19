'use strict';

import React from 'react'
import { Text, View, } from 'react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }
  }
  render() {
    let data = this.state
    return (
      <View style={[{ height: data.size || 0.5, backgroundColor: data.bgc || $xy.c.gray4 }, data.style]} ></View>
    )
  }
}
