'use strict';

import React from 'react'
import { Text } from 'react-native'

import { List, InputItem, TextareaItem, Picker, SwipeAction } from '@ant-design/react-native'
const Brief = List.Item.Brief

import ChildrenToFun from '../libs/ChildrenToFun'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XyList extends React.Component {
  constructor(props) {
    super(props)
    let values = {}
    if (props.items) {
      props.items.map((v, i) => {
        values['value' + i] = v.props ? (v.props.value || '') : ''
      })
    }
    this.state = {
      ...props,
      ...values
    }
    //console.log(this.state.onChange.toString())
  }
  // <XyList
  // props={{ style: { } }} 
  // type='input'
  // items={[{ props: {  }, content: '小区' },{ type:'picker', pickerProps:{}, props: {  }, content: '小区' },]} 
  // onChange={}
  // />
  render() {
    let data = this.state
    let fun
    if (data.children) {
      let children = new ChildrenToFun(data.children)
      fun = children.toFun()
    }
    return (
      <List style={data.style || []} {...data.props} {...fun} >
        {data.items.map((v, i) => {
          let type = 'list'
          if (data.type == 'input' || v.type == 'input') {
            type = 'input'
          } else if (data.type == 'textarea' || v.type == 'textarea') {
            type = 'textarea'
          } else if (data.type == 'picker' || v.type == 'picker') {
            type = 'picker'
          } else if (data.type == 'brief' || v.type == 'brief' || (v.props && v.props.brief)) {
            type = 'brief'
          }
          return this.renderItems(type, v, i)
        })}
      </List >)
  }
  renderItems(type, v, i) {
    let data = this.state
    v.content = typeof v.content == 'string' ? <Text style={$css.text} >{v.content}</Text> : v.content
    if (type == 'list') {
      if (v.props && v.props.swipeActionProps) {
        return <SwipeAction {...v.props.swipeActionProps} key={i.toString()} ><List.Item onClick={(d) => { data.onClick ? data.onClick(v) : '' }} {...v.props}>{v.content}</List.Item></SwipeAction>
      } else {
        return <List.Item onClick={(d) => { data.onClick ? data.onClick(v) : '' }} {...v.props} key={i.toString()}>{v.content}</List.Item>
      }
    } else if (type == 'brief') {
      if (v.props && v.props.swipeActionProps) {
        return <SwipeAction {...v.props.swipeActionProps} key={i.toString()} ><List.Item onClick={(d) => { data.onClick ? data.onClick(v) : '' }} {...v.props} key={i.toString()}>{v.content}{v.props && v.props.brief && <Brief>{v.props.brief}</Brief>}</List.Item></SwipeAction>
      } else {
        return <List.Item onClick={(d) => { data.onClick ? data.onClick(v) : '' }} {...v.props} key={i.toString()}>{v.content}{v.props && v.props.brief && <Brief>{v.props.brief}</Brief>}</List.Item>
      }
    } else if (type == 'input') {
      return <InputItem onChange={((d) => { this.setState({ ['value' + i]: d }); data.onChange ? data.onChange(d) : '' })} {...v.props} key={i.toString()}>{v.content}</InputItem>
    } else if (type == 'textarea') {
      return <TextareaItem onChange={((d) => { this.setState({ ['value' + i]: d }); data.onChange ? data.onChange(d) : '' })} {...v.props}  key={i.toString()}></TextareaItem>
    } else if (type == 'picker') {
      return <Picker key={'' + i} {...v.pickerProps}
        onOk={d => { this.setState({ ['value' + i]: d }) }}
        onDismiss={e => console.log('dismiss', e)}
      >
        <List.Item onClick={(d) => { data.onClick ? data.onClick(v) : '' }} {...v.props} key={i.toString()}>{v.content}</List.Item>
      </Picker>
    }
  }
}