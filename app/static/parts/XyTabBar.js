'use strict';

import React from 'react'

import { TabBar, } from '@ant-design/react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyTabBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      selectedTab: props.items[0].props.key,
    }
  }
  // <XyTabBar items={[{
  //   props: {
  //     title: '首页',
  //     key: 'home',
  //     icon: 'home',
  //     onPress: () => {
  //       console.log('press home')
  //     },
  //   },
  //   page: (
  //     <Home nav={this.props.navigation} changeTab={this.changeTab} />
  //   )
  // }]}
  // props={}
  // changeTab={() => { }} />

  render() {
    return (
      <TabBar {...$xy.tabBar} {...this.state.props || {} }>
        {this.renderItems()}
      </TabBar>
    )
  }
  renderItems() {
    return this.state.items.map((v) => {
      let p = v.props
      !p.ONPRESS && (p.ONPRESS = p.onPress)
      p.onPress = () => {
        this.setState({
          selectedTab: p.key
        })
        p.ONPRESS()
      }
      return (
        <TabBar.Item selected={this.state.selectedTab === p.key} {...p}>
          {v.page}
        </TabBar.Item>
      )
    })
  }
  changeTab(d) {
    this.setState({
      selectedTab: d.win,
    });
  }
}
