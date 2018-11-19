'use strict';

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, } from 'react-native'

import XyTag from './XyTag'

import $xy from '../styles/xyui'
import $css from '../styles/css'

// [{
//   key: '1',
//   position: 'left',
//   nickname: '王旭 经纪人',
//   headImg: require('../static/imgs/headImg.jpg'),
//   content: '随时可以看',
// }]
export default (callback) => {
  return ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => { callback ? callback(item) : '' }} >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: item.position == 'right' ? 'flex-end' : 'flex-start', marginBottom: 14 }} key={item.key || '0'} >
          {item.position == 'left' ? <Image source={item.headImg || { url: '' }} style={$css.headImg3} ></Image> : null}
          <View style={{ backgroundColor: item.position == 'right' ? $xy.c1.blue2 : '#fff', marginLeft: 10, marginRight: 10, padding: 10, borderRadius: 5 }} >
            <Text style={{ fontSize: 16, color:  $xy.c.defaultText }} >{item.content}</Text>
          </View>
          {item.position == 'right' ? <Image source={item.headImg || { url: '' }} style={$css.headImg3} ></Image> : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const _ = StyleSheet.create({
})