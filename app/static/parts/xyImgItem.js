'use strict';

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, } from 'react-native'

import { SwipeAction, } from '@ant-design/react-native'

import XyTag from './XyTag'

import $xy from '../styles/xyui'
import $css from '../styles/css'

// [{
//   key: '8',
//   nickname: '王旭 经纪人',
//   headImg: require('../static/imgs/headImg.jpg'),
//   content: '随时可以看',
//   extra: '',
//   swipeActionProps:{style:{},right:[{text:'',style:{}}],left:[{}]},
// }]
export default (callback) => {
  return ({ item }) => {
    return (
      <SwipeAction {...item.swipeActionProps} >
        <TouchableWithoutFeedback onPress={() => { callback ? callback(item) : '' }} >
          <View style={_.box} >
            <Image style={$css.headImg2} source={item.headImg} />
            <View style={_.inner}>
              <View style={_.top} >
                <Text style={_.nickname}>{item.nickname}</Text>
                {item.extra ? <Text style={_.time} >{item.extra}</Text> : null}
              </View>
              {item.content || item.contentExtra ? <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {item.content ? <Text style={_.content} >{item.content}</Text> : null}
                {typeof item.contentExtra == 'string' ? <Text style={{ color: $xy.c.gray1 }} >{item.contentExtra}</Text> : item.contentExtra}
              </View> : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SwipeAction >
    )
  }
}

const _ = StyleSheet.create({
  box: { flex: 1, flexDirection: 'row', padding: 16, borderBottomColor: $xy.c.gray4, borderBottomWidth: 0.5 },
  inner: { flex: 1, justifyContent: 'space-around', marginLeft: 10, height: 52 },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  nickname: { fontSize: 18, color: $xy.c.defaultText },
  time: { color: $xy.c.gray1 },
  content: { color: $xy.c.gray1 }
})