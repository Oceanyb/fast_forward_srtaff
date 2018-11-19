'use strict';

import React from 'react'
import { StyleSheet, View, Text, Image, } from 'react-native'

import XyLine from '../parts/XyLine'

import $xy from '../styles/xyui'

export default class XyTopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
  }
  // <XyTopBar bgc='#fff' items={['区域', '价格', '房型', '更多']} /> 
  render() {
    let data = this.state
    return <View>
      {data.lineT ? <XyLine /> : []}
      <View style={[_.top, { backgroundColor: data.bgc || '#fff' }, data.style]}>
        {data.items.map((v, i) => {
          return <View key={i.toString()} ><Text style={{ color: $xy.c.gray1 }} >{v}</Text></View>
        })}
      </View>
      {data.lineB ? <XyLine /> : []}
    </View>
  }
}

const _ = StyleSheet.create({
  top: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 44,
  }
})