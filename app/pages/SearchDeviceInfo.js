import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, List, InputItem, Modal, Toast, Icon, ActivityIndicator } from '@ant-design/react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dimensions from 'Dimensions';

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class SearchDeviceInfo extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props,
      searchInfoList:[],
      animating:false,
      idLocked:false,
      blackList:false,
      ifLocked:false,
      devReport:false
    }
  }

  render() {
    return (
      <View style={{ height:"100%",backgroundColor:'#EFEFEF'}}>
        <XyNavBar bgc="#44A754" title="查询信息" left="back" nav={this.props.navigation} style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH}}>
          <ScrollView style={{height:Dimensions.get('window').height - $xy.statusBarH - $xy.navH - 6}}>
            <View style={{marginTop:6,marginLeft:8,marginRight:8}}>
              <Item style={{borderRadius:5}}>
                <Text style={{fontSize:18,marginTop:6}}>{'IMEI：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'序列号：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3,marginTop:3}}>{'型号：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'容量：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'网络：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'网络支持：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'零件型号：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:18}}>{'激活状态：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'激活日期：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'有效购买日期：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'保修结束日期：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'保修剩余：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'技术支持：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:18}}>{'是否延保：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'借出设备：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3}}>{'生产日期：' + ''}</Text>
                <Text style={{fontSize:18,marginTop:3,marginBottom:6}}>{'制造商：' + ''}</Text>
              </Item>
            </View>
            {this.state.searchInfoList.map((item,index)=> 
              item == "IdStatus" ?
                <View style={{marginTop:10,marginLeft:8,marginRight:8}} key={index}>
                  <Item style={{borderRadius:5}}>
                    <Text style={{fontSize:18,marginTop:6}}>{'序列号：' + ''}</Text>
                    <Text style={{fontSize:18}}>{'型号：' + ''}</Text>
                    <Text style={{fontSize:18,marginBottom:6}}>{'ID锁状态：' + ''}</Text>
                  </Item>
                </View> : (item == 'BlackList' ?
                  <View style={{marginTop:10,marginLeft:8,marginRight:8}} key={index}>
                    <Item style={{borderRadius:5}}>
                      <Text style={{fontSize:18,marginTop:6}}>{'序列号：' + ''}</Text>
                      <Text style={{fontSize:18}}>{'型号：' + ''}</Text>
                      <Text style={{fontSize:18,marginBottom:6}}>{'ID锁状态：' + ''}</Text>
                    </Item>
                  </View> : (item == 'IfLocked' ?
                    <View style={{marginTop:10,marginLeft:8,marginRight:8}} key={index}>
                      <Item style={{borderRadius:5}}>
                        <Text style={{fontSize:18,marginTop:6}}>{'序列号：' + ''}</Text>
                        <Text style={{fontSize:18}}>{'型号：' + ''}</Text>
                        <Text style={{fontSize:18,marginBottom:6}}>{'ID锁状态：' + ''}</Text>
                      </Item>
                    </View> :
                    <View style={{marginTop:10,marginLeft:8,marginRight:8}} key={index}>
                      <Item style={{borderRadius:5}}>
                        <Text style={{fontSize:18,marginTop:6}}>{'序列号：' + ''}</Text>
                        <Text style={{fontSize:18}}>{'型号：' + ''}</Text>
                        <Text style={{fontSize:18,marginBottom:6}}>{'ID锁状态：' + ''}</Text>
                      </Item>
                    </View>
                  )
                )
            )}
            <View style={{margin:5}}>
              <ActivityIndicator animating={this.state.animating} text='正在加载' />
            </View>
            {this.state.searchInfoList.length == 4 ?
              <View></View> :
              <View style={{marginLeft:8,marginRight:8}}>
                <Item style={{borderRadius:5}}>
                  <View style={{marginTop:6,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18}}>ID锁状态：</Text>
                    {this.state.idLocked ?
                      <Text style={{color:'#9F9F9F',fontSize:18}}>点击查询 | 0.6元/次</Text> :
                      <TouchableOpacity onPress={()=>{this.searchIdStatus()}}>
                        <Text style={{color:'#3C87F0',fontSize:18}}>点击查询 | 0.6元/次</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  <View style={{marginTop:5,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18}}>黑白名单：</Text>
                    {this.state.blackList ?
                      <Text style={{color:'#9F9F9F',fontSize:18}}>点击查询 | 1.2元/次</Text> :
                      <TouchableOpacity onPress={()=>{this.searchBlackList()}}>
                        <Text style={{color:'#3C87F0',fontSize:18}}>点击查询 | 1.2元/次</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  <View style={{marginTop:5,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18}}>是否有锁：</Text>
                    {this.state.ifLocked ?
                      <Text style={{color:'#9F9F9F',fontSize:18}}>点击查询 | 1.8元/次</Text> :
                      <TouchableOpacity onPress={()=>{this.searchIfLocked()}}>
                        <Text style={{color:'#3C87F0',fontSize:18}}>点击查询 | 1.8元/次</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  <View style={{marginTop:5,marginBottom:6,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18}}>验机报告：</Text>
                    {this.state.devReport ?
                      <Text style={{color:'#9F9F9F',fontSize:18}}>点击查询 | 3.2元/次</Text> :
                      <TouchableOpacity onPress={()=>{this.searchDevReport()}}>
                        <Text style={{color:'#3C87F0',fontSize:18}}>点击查询 | 3.2元/次</Text>
                      </TouchableOpacity>
                    }
                  </View>
                </Item>
              </View>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
  componentDidMount = () => {
    
  }
  searchIdStatus = async () => {
    for(let i in this.state.searchInfoList){
      const v = this.state.searchInfoList[i]
      if('IdStatus' == v){
        return
      }
    }
    this.setState({animating:true})
    let _searchInfoList = this.state.searchInfoList
    // const res = await _api.get('/staff')
    if(1){
    // if(res.length){
      _searchInfoList.push('IdStatus')
      this.setState({
        animating:false,
        idLocked:true,
        searchInfoList:_searchInfoList
      })
      console.log(this.state.searchInfoList)
    }
  }
  searchBlackList = async () => {
    for(let i in this.state.searchInfoList){
      const v = this.state.searchInfoList[i]
      if('BlackList' == v){
        return
      }
    }
    this.setState({animating:true})
    let _searchInfoList = this.state.searchInfoList
    const res = await _api.get('/staff')
    if(res.length){
      _searchInfoList.push('BlackList')
      this.setState({
        animating:false,
        blackList:true,
        searchInfoList:_searchInfoList
      })
      console.log(this.state.searchInfoList)
    }
  }
  searchIfLocked = async () => {
    for(let i in this.state.searchInfoList){
      const v = this.state.searchInfoList[i]
      if('IfLocked' == v){
        return
      }
    }
    this.setState({animating:true})
    let _searchInfoList = this.state.searchInfoList
    const res = await _api.get('/staff')
    if(res.length){
      _searchInfoList.push('IfLocked')
      this.setState({
        animating:false,
        ifLocked:true,
        searchInfoList:_searchInfoList
      })
      console.log(this.state.searchInfoList)
    }
  }
  searchDevReport = async () => {
    for(let i in this.state.searchInfoList){
      const v = this.state.searchInfoList[i]
      if('DevReport' == v){
        return
      }
    }
    this.setState({animating:true})
    let _searchInfoList = this.state.searchInfoList
    const res = await _api.get('/staff')
    if(res.length){
      _searchInfoList.push('DevReport')
      this.setState({
        animating:false,
        devReport:true,
        searchInfoList:_searchInfoList
      })
      console.log(this.state.searchInfoList)
    }
  }
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({
});