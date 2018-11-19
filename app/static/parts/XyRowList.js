'use strict';

import React from 'react'
import { Text, View, } from 'react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyRowList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }

  }
  render() {
    let data = this.state
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16 }, data.style]}>
        {data.items.map((v, i) => {
          return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', height: 44 }} key={i.toString()}>
              <Text style={{ fontSize: 14, color: $xy.c.gray1 }} {...v.titleStyle} >{v.title}</Text>
              <Text style={{ fontSize: 17, color: $xy.c2.red1 }} {...v.contentStyle}>{v.content}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
