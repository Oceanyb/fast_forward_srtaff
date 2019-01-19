import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, List, InputItem, Modal, Toast, Icon, NoticeBar } from '@ant-design/react-native'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class Messages extends Component<Props> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '消息',
    tabBarIcon: ({focused}) => {
      if(focused){
        return (<Icon name='message' color='#44A754'/>)
      }else{
        return (<Icon name='message' color='#949494'/>)
      }
    }
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props
    }
  }

  render() {
    return (
      <View style={{ height:"100%"}}>
        <XyNavBar bgc="#44A754" title="消息" style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH,marginBottom:5}}>
          <NoticeBar onPress={()=>{}} mode='closable'>你的收付款额度已超过限额3万元你的收付款额度已超过限额3万元</NoticeBar>
          <ScrollView></ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});