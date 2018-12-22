'use strict';

import React from 'react'
import { Text, View, SectionList, } from 'react-native'

import { TabBar, } from '@ant-design/react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XySectionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }

  }
  // <XySectionList
  //   renderItem={xyGoodItem()}
  //   sections={[ // 不同section渲染相同类型的子组件
  //     {data: [{}], key: 'goodHouse', headerTitle: '优选好房', headerRight: '查看全部',},
  //   ]}
  // />
  render() {
    return (
      <SectionList
        renderItem={this.state.renderItem}
        renderSectionHeader={this.renderListHeader}
        sections={this.state.sections}
        style={this.state.style}
      />
    )
  }
  renderListHeader(data) {
    if (!data.section.headerTitle && !data.section.headerRight) {
      return []
    } else {
      return (
        <View>
          {data.lineT ? <XyLine size={10} ></XyLine> : []}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, }} >
            {typeof data.section.headerTitle === 'string' ? <Text style={$css.title} >{data.section.headerTitle || ''}</Text> : data.section.headerTitle}
            {typeof data.section.headerRight === 'string' ? <Text style={{ color: $xy.c2.blue2, fontSize: 16 }} onPress={data.section.onRightPress} >{data.section.headerRight || ''}</Text> : data.section.headerRight}
          </View>
          {data.lineB ? <XyLine size={10} ></XyLine> : []}
        </View>
      )
    }
  }
}
