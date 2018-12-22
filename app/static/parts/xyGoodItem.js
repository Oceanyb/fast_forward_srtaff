'use strict';

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, } from 'react-native'

import { SwipeAction, } from '@ant-design/react-native'

import XyTag from './XyTag'

import $xy from '../styles/xyui'
import $css from '../styles/css'

let _ = StyleSheet.create({
  box: { flex: 1, flexDirection: 'row', padding: 16 },
  content: { flex: 1, justifyContent: 'space-between', marginLeft: 10, height: 100 },
  title: { fontSize: 16, color: $xy.c.defaultText },
  details: { flexDirection: 'row', alignItems: 'center' },
  price: { color: $xy.c2.red1, marginRight: 10, fontSize: 16 },
  acreage: { color: $xy.c.gray1 },
})

// [{
//   key: '1',
//   title: '弘阳上城 全天采光',
//   img: require('../static/imgs/banner1.png'),
//   price: '120万',
//   acreage: '12000元/m2',
//   tags: [{ title: '满五', color: $xy.xyTagRed }, { title: '新上' }, { title: '地铁' }],
//   info: '4室2厅,168m2,南北通透',
//   swipeActionProps:{style:{},right:[text:'',style:{}],left:[]},
// }]

const renderItem = (item, callback) => <TouchableWithoutFeedback onPress={() => { callback ? callback(item) : '' }} >
  <View style={_.box} >
    <Image style={$css.itemImg2} source={item.img} />
    <View style={_.content}>
      <Text style={_.title} numberOfLines={2} >{item.title}</Text>
      <View style={_.details}>
        <Text style={_.price}>{item.price}</Text>
        <Text style={_.acreage}>{item.acreage}</Text>
      </View>
      <XyTag items={item.tags} type='fill' ></XyTag>
      <Text style={{ color: $xy.c.gray1, fontSize: 12 }} >{item.info}</Text>
    </View>
  </View>
</TouchableWithoutFeedback>

export default (callback) => {
  return ({ item }) => {
    if (item.swipeActionProps) {
      return (
        <SwipeAction {...item.swipeActionProps} >
          {renderItem(item, callback)}
        </SwipeAction>
      )
    } else {
      return renderItem(item, callback)
    }

  }
}