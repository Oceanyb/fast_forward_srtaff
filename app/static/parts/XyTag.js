'use strict';

import React from 'react'
import { View, Text } from 'react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }
  }
  // <XyTag items={[{ title: '', color: $css.TagRed }]}></XyTag>
  render() {
    let data = this.state
    let items = this.state.items;
    if (items && items.length > 0) {
      let list = new Array(items.length)
      for (let i = 0; i < items.length; i++) {
        if (data.type == 'fill') {
          if (i == 0) {
            list[i] = (<View style={[{ backgroundColor: items[i].color || $xy.c.defaultBgLight, borderRadius: 5, }]} key={i.toString()} ><Text style={[{ color: '#fff', fontSize: 12, height: 16, paddingLeft: 4, paddingRight: 4, paddingTop: 2 }]}>{items[i].title || null}</Text></View>)
          } else {
            list[i] = (<View style={[{ backgroundColor: items[i].color || $xy.c.defaultBgLight, borderRadius: 5, }, { marginLeft: 10 }]} key={i.toString()}><Text style={[{ color: '#fff', fontSize: 12, height: 16, paddingLeft: 4, paddingRight: 4, paddingTop: 2 }, items[i].style]}>{items[i].title || null}</Text></View>)
          }
        } else {
          if (i == 0) {
            list[i] = (<Text style={[$css.xyTag, items[i].style, { color: items[i].color || $xy.c.default, borderColor: items[i].color || $xy.c.default }]} key={i.toString()}>{items[i].title || null}</Text>)
          } else {
            list[i] = (<Text style={[$css.xyTag, items[i].style, { color: items[i].color || $xy.c.default, borderColor: items[i].color || $xy.c.default }, { marginLeft: 10 }]} key={i.toString()}>{items[i].title || null}</Text>)
          }
        }
      }
      return (
        <View style={{ flex: 0, flexDirection: 'row' }}>{list}</View>
      )
    } else if (data.children) {
      return <View style={{ flex: 0, flexDirection: 'row' }} ><Text style={[$css.xyTag, data.color,]}>{data.children}</Text></View>
    } else {
      return []
    }
  }
}
