'use strict';

import React from 'react'
import { Text, View, } from 'react-native'

import XyLine from '../parts/XyLine'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyHeaderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }

  }
  // <XyHeaderList padd lineT lineB headerTitle='' headerRight='' ></XyHeaderList>
  render() {
    let data = this.state
    return (
      <View>
        {data.lineT ? <XyLine size={10} ></XyLine> : null}
        <View style={[{ padding: data.padd ? 16 : 0 }, data.style]} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 32, padding: data.padd ? 0 : 16, paddingBottom: data.padd ? 16 : 0 }} >
            {typeof data.headerTitle === 'string' ? <Text style={$css.title} onPress={data.onTitlePress} >{data.headerTitle || ''}</Text> : data.headerTitle}
            {typeof data.headerRight === 'string' ? <Text style={{ color: $xy.c2.blue2, fontSize: 16 }} onPress={data.onRightPress} >{data.headerRight || ''}</Text> : data.headerRight}
          </View>
          {data.children || null}
        </View>
        {data.lineB ? <XyLine size={10} ></XyLine> : null}
      </View>
    )
  }
}
