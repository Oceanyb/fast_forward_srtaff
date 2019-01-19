import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Button, List, InputItem, Modal, Toast, Icon } from '@ant-design/react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dimensions from 'Dimensions';

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class My extends Component<Props> {
  static navigationOptions = {
    headerTitle:<Text style={{color:'#000'}}>wode</Text>,
    tabBarLabel: '我的',
    tabBarIcon: ({focused}) => {
      if(focused){
        return (<Icon name='user' color='#44A754'/>)
      }else{
        return (<Icon name='user' color='#949494'/>)
      }
    }
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props,
      staff:{},
      name:''
    }
  }

  render() {
    return (
      <View style={{ height:"100%"}}>
        <XyNavBar bgc="#44A754" title="我的" style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <TouchableWithoutFeedback onPress={()=>{this.state.navigation.navigate('UserInfo')}}>        
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#44A754',height:102,marginTop:$xy.statusBarH + $xy.navH}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <View style={{backgroundColor:'#F2A05F',height:78,width:78,borderRadius:8,margin:16,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'#fff'}}>{this.state.name}</Text>
              </View>
              <View style={{height:78,justifyContent:'center'}}>
                <Text style={{fontSize:16,color:'#fff',marginBottom:12}}>{this.state.staff.name}</Text>
                <Text style={{fontSize:14,color:'#fff'}}>{this.state.staff.phone}</Text>
              </View>
            </View>
            <View style={{height:44,justifyContent:"center",marginRight:12}}>
              <Icon name="right" color="#fff"/>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <List>
          <Item arrow='horizontal' thumb={<Icon name="shop" size={26} color='#44A754' />} onPress={()=> this.props.navigation.navigate('ShopInfo')}>
            <Text style={{margin:8,fontSize:16}}>店铺信息</Text>
          </Item>
          <Item arrow='horizontal' thumb={<Icon name="phone" size={26} color='#44A754'/>} onPress={()=> this.props.navigation.navigate('Help')}>
            <Text style={{margin:8,fontSize:16}}>客服帮助</Text>
          </Item>
        </List>
      </View>
    );
  }
  componentDidMount = async () => {
    let staff = ''
    staff = JSON.parse(await AsyncStorage.getItem('staff'))
    const name = staff.name.substring(staff.name.length-2)
    this.setState({staff,name})
  }
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({

});