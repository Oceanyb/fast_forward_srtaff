'use strict';

import React from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { TabBar, } from 'antd-mobile-rn'

import $xy from '../styles/xyui'
import $css from '../styles/css'

let _ = StyleSheet.create({
  box: { height: 88, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center' },
  headImg: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 7, height: 52, justifyContent: 'space-around' },
  nickname: { fontSize: 20, color: '#fff', flexDirection: 'row' },
  info: { color: '#ffffffbb' }
})

export default class XyUserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }
  }
  // <XyUserInfo nickname='' info='' headImg={require('')} style={{ backgroundColor: $xy.c2.blue2 }}>
  //   <Text slot='nickname' >12</Text>
  //   <Text slot='info'>11</Text>
  // </XyUserInfo>
  render() {
    let data = this.state
    console.log(data)
    if (data.nickname) {
      data.nickname = <Text style={_.nickname} >{data.nickname}</Text>
    }
    if (data.info) {
      data.info = <Text style={_.info} >{data.info}</Text>
    }
    if (data.children && data.children.length > 1) {
      data.children.map((v, i) => {
        if (v.props.slot == 'nickname') {
          data.nickname = v
        } else if (v.props.slot == 'info') {
          data.info = v
        }
      })
    } else if (data.children) {
      if (data.children.props.slot == 'nickname') {
        data.nickname = data.children
      } else if (data.children.props.slot == 'info') {
        data.info = data.children
      }
    }
    console.log(data)
    return (
      <View style={[_.box, data.style]} >
        <TouchableWithoutFeedback onPress={data.onHeadImgPress} >
          <View style={_.headImg} >
            <Image style={$css.headImg2} source={data.headImg} />
          </View>
        </TouchableWithoutFeedback>
        <View style={_.content} >
          <TouchableWithoutFeedback onPress={data.onNicknamePress} >
            <View>
              {data.nickname}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={data.onInfoPress} >
            <View>{data.info}</View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
