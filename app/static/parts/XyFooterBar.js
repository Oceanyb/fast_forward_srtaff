'use strict';

import React from 'react'
import { Text, View, Image } from 'react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyFooterBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }
  }
  // <XyFooterBar
  // left={[{ style: {}, icon: { style: {}, color: '#fff', source:{} }, text: { style: {}, title: '' } }]}
  // right={[{ style: {}, text: '', color: '#fff' }]} ></XyFooterBar>ƒ
  render() {
    let data = this.state
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 0, paddingBottom: $xy.homeBarH, zIndex: 999, backgroundColor: '#fff', borderTopColor: $xy.c.gray3, borderTopWidth: 0.5 }, data.style]}>
        {data.left.map((v, i) => {
          return (
            <View key={i.toString()} style={[{ justifyContent: 'space-between', alignItems: 'center', width: 54, height: 44, paddingTop: 5, paddingBottom: 5, borderRightColor: $xy.c.gray3, borderRightWidth: i == data.left.length ? 0 : 0.5 }, v.style]} >
              {v.icon.source ? <Image style={[{ width: 20, height: 20 }, v.icon.style]} tintColor={v.icon.color || $xy.c.gray1} source={v.icon.source} ></Image> : (v.icon || null)}
              <Text style={[{ color: $xy.c.gray1, fontSize: 12 }, v.text.style]} >{v.text.title}</Text>
            </View>
          )
        })}
        {data.right.map((v, i) => {
          return (
            <View key={i.toString()} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 44, height: 44, backgroundColor: v.bgc || $xy.c.defaultBg }, v.style]} >
              <Text style={{ color: v.color || '#fff' }} >{v.text}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
