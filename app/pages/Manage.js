import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Button, List, InputItem, Toast, Icon } from '@ant-design/react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dimensions from 'Dimensions';

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class Manage extends Component<Props> {
  static navigationOptions = () => ({
    tabBarLabel: '工作台',
    tabBarIcon: ({focused}) => {
      if(focused){
        return (<Icon name='appstore' color='#44A754'/>)
      }else{
        return (<Icon name='appstore' color='#949494'/>)
      }
    }
  })
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      imei:'',
      staff:{},
      stock:'',
    }
  }
  
  render() {
    return (
      <View style={{ height:"100%"}}>
        <View style={{ backgroundColor:"#44A754",height:$xy.statusBarH + $xy.navH,position: 'absolute', width: '100%', zIndex: 999,paddingTop: $xy.statusBarH }} >
          <View style={{ alignItems: 'center',justifyContent:'center',height:44 }}>
            <Text style={{ color: '#fff', fontSize: 20 }} >工作台</Text>
          </View>
        </View>
        <KeyboardAwareScrollView
          onKeyboardWillShow={(frames) => {
            console.log('Keyboard event', frames)
          }}
          onKeyboardWillHide={(frames) => {
            console.log('Keyboard event', frames)
          }}
          style={{ height: Dimensions.get('window').height - $xy.statusBarH - $xy.navH - 44 - $xy.homeBarH }}
        >
          <View style={{backgroundColor:'#44A754',height:60,marginTop:$xy.statusBarH + $xy.navH}}>
            <View style={styles.searchDevice}>
              <Text style={{fontSize:16,marginTop:8}}>查询机器</Text>
              <List style={{width:'90%'}}>
                <InputItem
                  clear
                  value={this.state.imei}
                  onChange={(v) => {
                    this.setState({
                      imei: v
                    })
                  }}
                  placeholder='请输入IMEI/序列号'
                  extra={<Icon name='scan' color='#434542'/>}
                  onExtraClick={()=>{this.state.navigation.navigate('SearchDeviceInfo')}}
                ></InputItem>
              </List>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={()=>{this.state.navigation.navigate('GoodList')}}>
            <View style={styles.card_stock}>
              <View style={{height:52,width:52,marginLeft:18,alignItems:'center',justifyContent:'center',backgroundColor:'#F2A05F'}}>
                <Text style={{fontSize:22,color:'#fff'}}>库</Text>
              </View>
              <View style={{height:52,marginLeft:10,flexDirection:'column',justifyContent:'space-around'}}>
                <Text style={{fontSize:16}}>库存管理</Text>
                <Text style={{fontSize:14,opacity:0.7}}>库存数量：<Text style={{color:'red'}}>{this.state.stock}</Text>件</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>{this.state.navigation.navigate('Account')}}>
            <View style={styles.card}>
              <View style={{height:52,width:52,marginLeft:18,alignItems:'center',justifyContent:'center',backgroundColor:'#F2A05F'}}>
                <Text style={{fontSize:22,color:'#fff'}}>余</Text>
              </View>
              <View style={{height:52,marginLeft:10,flexDirection:'column',justifyContent:'space-around'}}>
                <Text style={{fontSize:16}}>账户余额</Text>
                <Text style={{fontSize:14,opacity:0.7}}>剩余金额：<Text style={{color:'red'}}>{this.state.name}</Text>元</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  componentDidMount = async () => {
    this.isLogin()
  }
  isLogin = async () => {
    let staff = ''
    staff = JSON.parse(await AsyncStorage.getItem('staff'))
    const stock = await _api.get('/moment.onsale',{
      shop_id: staff.shop_id
    })
    if(stock){
      this.setState({staff,stock:stock.length})
    }
  }
}

const styles = StyleSheet.create({
  card_stock:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff',
    height:88,
    marginTop:100,
    marginLeft:32,
    marginRight:32,
    borderRadius:6,
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowRadius:8,
    shadowOffset:{height:1}
  },
  card:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff',
    height:88,
    marginTop:20,
    marginLeft:32,
    marginRight:32,
    borderRadius:6,
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowRadius:8,
    shadowOffset:{height:1}
  },
  searchDevice:{
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:'#fff',
    height:102,
    margin:18,
    borderRadius:8,
    shadowColor:'#44A754',
    shadowOpacity:0.2,
    shadowRadius:10,
    shadowOffset:{height:1}
  }
});