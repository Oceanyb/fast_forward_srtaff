'use strict';

import React from 'react'
import { Text, View, TouchableHighlight, } from 'react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      pressStatus: false
    }
  }
  render() {
    let data = this.state
    let h = 44
    let pd = 16
    let fz = 18
    let bg
    let underlayColor
    let textColor
    if (data.size == 'small') {
      h = 28
      pd = 10
      fz = 14
    } else if (data.size == 'big') {
      h = 44
    }
    if (data.type == 'line') {
      bg = '#fff'
      underlayColor = $xy.c.gray4
      textColor = data.color || $xy.c.gray2
    }
    return (
      <View style={{ flexDirection: 'row', margin: data.size == 'big' ? 16 : 0 }} >
        <TouchableHighlight
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onPress={() => { if (data.onPress) data.onPress() }}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
          style={[{ flex: data.size == 'big' ? 1 : 0, justifyContent: 'center', alignItems: 'center', height: h, borderRadius: 5, borderColor: data.color || $xy.c.gray3, borderWidth: data.type == 'line' ? 1 : 0 }, { backgroundColor: this.state.pressStatus ? (bg || data.activeColor || $xy.c.defaultBgActive) : (bg || data.color || $xy.c.defaultBg) }, data.style]}
          underlayColor={underlayColor || data.activeColor || $xy.c.defaultBgActive}>
          <Text style={[{ fontSize: fz, paddingLeft: pd, paddingRight: pd, color: textColor || '#fff' }, data.textStyle]}>
            {data.children || ''}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  _onHideUnderlay() {
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay() {
    this.setState({ pressStatus: true });
  }
}
