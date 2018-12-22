'use strict';

import React from 'react'
import { StyleSheet, View, Text, Image, Platform, TouchableWithoutFeedback, DeviceEventEmitter } from 'react-native'

import { TabBar, } from '@ant-design/react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

import PartsList from '../libs/PartList'

export default class XyNavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
    this.reRender = this.reRender.bind(this)
  }
  // <XyNavBar left='' title='' right='' rightIcon={}>
  //   <View slot='left'></View>
  //   <View slot='title'></View>
  //   <View slot='right'></View>
  // </XyNavBar>
  render() {
    let data = this.state
    return (
      <View style={[_.nav, { backgroundColor: data.bgc2 || data.bgc || '#3cb4f0', paddingTop: $xy.statusBarH, }, data.style, $css.navH]} >
        {this.renderContent(data)}
      </View>
    )
  }
  reRender() {
    this.forceUpdate()
  }
  onScroll(d) {
    d.h == 1 ? this.setState({ changeTitle: d.title }) : this.setState({ changeTitle: '' })
    d.h *= 255
    d.h = parseInt(d.h)
    d.h = this.state.bgc.substr(0, 7) + (d.h.toString(16).length == 1 ? '0' + d.h.toString(16) : d.h.toString(16))
    this.setState({ bgc2: d.h })
  }
  renderContent(data) {
    let list = [data.leftIcon ? this.renderLeftIcon(data.leftIcon || '') : this.renderLeft(data.left || ''),
    this.rendertitle(data.title || ''),
    data.rightIcon ? this.renderRightIcon(data.rightIcon || '') : this.renderRight(data.right || '')]
    if (data.children) {
      let PL = new PartsList(list)
      list = PL.insert(data.children)
    }
    return list
  }
  renderLeft(left) {
    let data = this.state
    let nav = this.state.nav
    if (left == 'back') {
      return (
        <TouchableWithoutFeedback key='left' solt='left' onPress={() => { nav.goBack(); if (data.onLeftPress) data.onLeftPress() }}>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10 }} >
            <View style={{ height: 44, paddingTop: 8 }}><Image source={require('../icons/back.png')} /></View>
            {/* <Text style={{ color: '#fff', fontSize: 16, height: 44, lineHeight: 40 }} >返回</Text> */}
          </View>
        </TouchableWithoutFeedback>)
    } else if (typeof left == 'string') {
      return (
        <TouchableWithoutFeedback key='left' solt='left' onPress={() => { if (data.onLeftPress) data.onLeftPress() }}>
          <View style={{ flex: 2, alignItems: 'flex-start', paddingLeft: 15 }}>
            <Text style={{ color: '#fff', fontSize: 16 }} >{left}</Text>
          </View>
        </TouchableWithoutFeedback>)
    } else {
      return <View key='left' solt='left' style={{ flex: 2 }} />
    }
  }
  renderLeftIcon(leftIcon) {
    let data = this.state
    if (typeof left == 'string') {
      return <TouchableWithoutFeedback key='left' solt='left' onPress={() => { if (data.onLeftPress) data.onLeftPress() }}> <View style={{ flex: 2, alignItems: 'flex-start', paddingLeft: 15 }}><Image solt='leftIcon' source={left} style={{ tintColor: data.leftTintColor }} /></View></TouchableWithoutFeedback>
    } else {
      return <View key='left' solt='left' style={{ flex: 2 }} />
    }
  }
  rendertitle(title) {
    let data = this.state
    if (typeof title == 'string') {
      return (
        <TouchableWithoutFeedback key='title' solt='title' onPress={() => { if (data.ontitlePress) data.ontitlePress() }}>
          <View style={{ flex: 6, alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 20, }} >{this.state.changeTitle || title}</Text></View>
        </TouchableWithoutFeedback>)
    } else {
      return <View key='title' solt='title' style={{ flex: 6 }} />
    }
  }
  renderRight(right) {
    let data = this.state
    if (typeof right == 'string') {
      return (
        <TouchableWithoutFeedback key='right' solt='right' onPress={() => { if (data.onRightPress) data.onRightPress() }}>
          <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 15, }}><Text style={{ color: '#fff', fontSize: 16 }} >{right}</Text></View>
        </TouchableWithoutFeedback>)
    } else if (right.props && right.props.solt == 'rightIcon') {
      return (
        <TouchableWithoutFeedback key='right' solt='right' onPress={() => { if (data.onRightPress) data.onRightPress() }}>
          <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 15, }}>{right}</View>
        </TouchableWithoutFeedback>)
    } else {
      return <View key='right' solt='right' style={{ flex: 2 }} />
    }
  }
  renderRightIcon(rightIcon) {
    let data = this.state
    if (rightIcon) {
      return (
        <TouchableWithoutFeedback key='right' solt='right' onPress={() => { if (data.onRightPress) data.onRightPress() }}>
          <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 15 }}><Image solt='rightIcon' source={rightIcon} style={{ tintColor: data.rightTintColor }} ></Image></View>
        </TouchableWithoutFeedback >)
    } else {
      return <View key='right' solt='right' style={{ flex: 2 }} />
    }
  }
}

const _ = StyleSheet.create({
  nav: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999
  }
})