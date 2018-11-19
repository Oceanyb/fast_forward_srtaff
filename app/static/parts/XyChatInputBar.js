'use strict';

import React from 'react'

import { View, TextInput } from 'react-native'

import XyButton from '../parts/XyButton'

import Icon from 'react-native-vector-icons/Iconfont'

import $xy from '../styles/xyui'

export default class XyChatInputBar extends React.Component {
  constructor(props) {
    super(props)
    let values = {}
    this.state = {
      ...props,
    }
  }
  render() {
    let data = this.state
    return <View ref='box' style={[{ height: 44, flexDirection: 'row', alignItems: 'center', backgroundColor: data.bgc || $xy.c.gray4 }, data.style]} >
      <Icon name='round_add' size={28} color={$xy.c.gray2} style={{ padding: 10 }} />
      <TextInput ref='TextInput' style={{ height: 32, padding: 5, fontSize: 16, backgroundColor: '#fff', flex: 1, marginRight: 10, borderRadius: 5 }} {...data.inputProps} ></TextInput>
      <XyButton style={{ marginRight: 10, height: 32 }} size='small' >发送</XyButton>
    </View>
  }
}
