import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { Button, List, InputItem, Toast } from 'antd-mobile-rn';

import LocalImg from '../images';
import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

//import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class Login extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      phone: '',
      password: ''
    }
    console.log(props)
  }
  render() {
    return (
      <View style={{height:"100%",backgroundColor:"#fff"}}>
        <XyNavBar bgc="#1E78F0" title="登录" style={{ position: 'absolute', width: '100%', zIndex: 999 }}></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH,display:"flex",alignItems:"center"}}>
          <Image style={{height:240,width:375}} source={LocalImg['suichu_t']}/>
          <Text style={{fontSize:24,marginBottom:22,color:'#1E78F0'}}>销 售 登 录</Text>
          <List style={{width:'72%',marginTop:10}}>
            <InputItem
              clear
              type="number"
              placeholder="手机号"
              onChange={(v) => {
                this.setState({
                  phone: v,
                });
              }}
            >
              <Text>手机号:</Text>
            </InputItem>
          </List>
          <Button type="primary" activeStyle={{backgroundColor:"#1E78F0",opacity:0.95}} inline style={{width:'60%',marginTop:30}} onPressOut={()=>{this.login()} }>登  录</Button>
        </View>
      </View>
    );
  }
  login = async () => {
    console.log('api',_api)
    if (!this.state.phone) {
      Toast.fail('请输入手机号', 1);
      return
    }
    const res = await _api.post('/login', {
      provider: 'local',
      role: 'staff',
      username: this.state.phone,
      password: '000000'
    })
    console.log('res',res)
    if (res.err) {
      Toast.fail('请检查手机号是否正确!');
    } else {
      Toast.success('登录成功', 0.5);
      AsyncStorage.setItem('user', JSON.stringify(res))
      this.props.navigation.replace('Home')
    }
  }
}