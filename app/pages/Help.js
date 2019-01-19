import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Button, List, InputItem, Modal, Toast, Icon } from '@ant-design/react-native'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class Help extends Component<Props> {
  static navigationOptions = {
    header: null,
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
      <View style={{ height:"100%",backgroundColor:'#EFEFEF'}}>
        <XyNavBar bgc="#44A754" title="客服帮助" left="back" nav={this.props.navigation} style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH}}>
          <Text style={{margin:15,fontSize:16}}>服务经理</Text>
          <View style={{height:88,flexDirection:'row',alignItems:'center',paddingLeft:14,borderWidth:0.5,borderColor:'#ddd9d5',backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
              <View style={{height:52,width:52,backgroundColor:'#F2A05F',marginRight:6,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff'}}>蓝青</Text>                
              </View>
            </View>
            <Text style={{fontSize:18}}>蓝青</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'#fff'}}>
            <TouchableOpacity onPress={() => {}} style={{width:'50%'}}>        
              <View style={{alignItems:'center'}}><Text style={{fontSize:18,margin:15,color:'#3C87F0'}}>查看微信</Text></View>
            </TouchableOpacity>
            <View style={{alignItems:'center'}}>
              <View style={{height:30,backgroundColor:'#ddd9d5',width:0.5}}></View>
            </View>
            <TouchableOpacity onPress={() => this.callHelp()} style={{width:'50%'}}>        
              <View style={{alignItems:'center'}}><Text style={{fontSize:18,margin:15,color:'#3C87F0'}}>服务热线</Text></View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:40}}>
            <View style={{marginLeft:30}}>
              <View style={{height:0.5,backgroundColor:'#aaaaaa',width:100}}></View>
            </View>
            <Text style={{fontSize:18,color:'#aaaaaa'}}>常见问题</Text>
            <View style={{marginRight:30}}>
              <View style={{height:0.5,backgroundColor:'#aaaaaa',width:100}}></View>
            </View>
          </View>
          <View style={{marginTop:30}}>
            <List>
              <Item arrow='horizontal' onPress={()=> {}}>
                <Text>什么类型的商家适合使用随出库存？</Text>
              </Item>
              <Item arrow='horizontal' onPress={()=> {}}>
                <Text>随出库存能帮助商家解决什么问题？</Text>
              </Item>
              <Item arrow='horizontal' onPress={()=> {}}>
                <Text>其他问题</Text>
              </Item>
            </List>
          </View>
        </View>
      </View>
    );
  }
  callHelp = () => {
    Linking.openURL('tel:15106122192')
  }
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({
});