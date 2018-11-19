'use strict';

import React from 'react'
import { Text, View, FlatList, } from 'react-native'

import { SwipeAction, } from 'antd-mobile-rn'

import $xy from '../styles/xyui'

export default class XyFlatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }
  }
  // <XyFlatList
  //   renderItem={xyMsgItem}
  //   data={[{}]}
  // />
  render() {
    let data = this.state
    return (
      <FlatList
        style={data.style}
        data={data.data}
        renderItem={data.renderItem}
        refreshing={false}
        {...data.props}
        onRefresh={data.onRefresh ? data.onRefresh : () => { }}
        extraData={this.state}
      />
    )
  }
}
