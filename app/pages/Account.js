import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, List, InputItem, Modal, Toast, Icon } from '@ant-design/react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dimensions from 'Dimensions';

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class Account extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props,
      visible: false,
      setPrice:[
        {money:10,gift:0,select:0,selected:false},
        {money:20,gift:0,select:1,selected:false},
        {money:50,gift:0,select:2,selected:false},
        {money:100,gift:28,select:3,selected:false},
        {money:200,gift:68,select:4,selected:false},
        {money:500,gift:228,select:5,selected:false}
      ],
      upMoney: 0
    }
  }

  render() {
    const footerButtons = [
      { text: '取消',onPress:()=>{this.upCancel()}},
      { text: '充值',onPress:()=>{console.log(this.state.upMoney)}}
    ]
    return (
      <View style={{ height:"100%",backgroundColor:'#EFEFEF'}}>
        <XyNavBar bgc="#44A754" title="账户余额" left="back" nav={this.props.navigation} style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH}}>
          <View style={{margin:8,borderRadius:5,backgroundColor:'#44A754',height:220,justifyContent:'space-between'}}>
            <View style={{margin:30}}>
              <Text style={{color:'#fff',fontSize:16,marginBottom:20}}>账户可用余额  (元)</Text>
              <Text style={{color:'#fff',fontSize:48,fontWeight:'700'}}>1350.00</Text>
            </View>
            <TouchableOpacity onPress={()=>{this.setState({visible:true})}}>
              <View style={{alignItems:'center',justifyContent:'space-between',height:56}}>
                <View style={{width:'90%',height:0.5,backgroundColor:'#fff'}}></View>
                <Text style={{color:'#fff',fontSize:20,fontWeight:'900',marginBottom:16}}>充  值</Text>
              </View>
            </TouchableOpacity>
          </View>
          <List style={{marginTop:5}}>
            <Item style={{paddingLeft:12}} arrow='horizontal' onPress={()=>{this.state.navigation.navigate('RechargeRecord')}}>
              充值记录
            </Item>
            <Item style={{paddingLeft:12}} arrow='horizontal' onPress={()=>{this.state.navigation.navigate('BillDetail')}}>
              账单明细
            </Item>
          </List>
        </View>
        <Modal
          title='选择充值金额'
          transparent
          maskClosable={true}
          visible={this.state.visible}
          footer={footerButtons}
          style={{borderRadius:15}}
        >
          <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
            {this.state.setPrice.map((item,index)=>
              <TouchableWithoutFeedback onPress={()=> this.selectedMoney(item,index)} key={index}>
                {item.selected ?
                  <View style={{alignItems:'center',justifyContent:'center',width:80,height:50,backgroundColor:'#EFEFEF',borderRadius:8,marginTop:15,borderWidth:1,borderColor:'#3C87F0'}}>
                    <Text style={{color:'#3C87F0'}}>￥{item.money}</Text>
                    {(item.gift == 0) ? 
                      <View></View> : <Text style={{fontSize:12,color:'red'}}>送￥{item.gift}</Text>
                    }
                  </View> :
                  <View style={{alignItems:'center',justifyContent:'center',width:80,height:50,backgroundColor:'#EFEFEF',borderRadius:8,marginTop:15,borderWidth:1,borderColor:'#EFEFEF'}}>
                    <Text style={{color:'#000'}}>￥{item.money}</Text>
                    {(item.gift == 0) ? 
                      <View></View> : <Text style={{fontSize:12,color:'gray'}}>送￥{item.gift}</Text>
                    }
                  </View>
                }
              </TouchableWithoutFeedback>
            )}
          </View>
        </Modal>
      </View>
    );
  }
  componentDidMount = () => {
    
  }
  selectedMoney = (item,index) => {
    const _setPrice = this.state.setPrice
    for(let i in _setPrice){
      const v = _setPrice[i]
      if(v.select == index){
        v.selected = true
        this.state.upMoney = v.money
      }else{
        v.selected = false
      }
    }
    this.setState({setPrice:_setPrice,upMoney:this.state.upMoney})
  }
  upCancel = () => {
    const _setPrice = this.state.setPrice
    for(let i in _setPrice){
      _setPrice[i].selected = false
    }
    this.setState({setPrice:_setPrice,visible:false})
  }
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({
});