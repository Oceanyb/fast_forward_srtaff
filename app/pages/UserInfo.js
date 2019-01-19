import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Button, List, InputItem, Modal, Card, Toast, Icon } from '@ant-design/react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class UserInfo extends Component<Props> {
  static navigationOptions = {
    header: null,
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
      <View style={{ height:"100%",backgroundColor:'#EFEFEF'}}>
        <XyNavBar bgc="#44A754" title="账户信息" left="back" nav={this.props.navigation} style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH}}>
          <Card full style={{marginTop:6,paddingBottom:0}}>
            <Card.Body style={{paddingBottom:0}}>
              <TouchableWithoutFeedback onPress={() => {}}>        
                <View style={{height:88,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:14}}>
                  <Text style={{fontSize:18}}>我的头像</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:78,width:78,backgroundColor:'#F2A05F',marginRight:6,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:18,color:'#fff'}}>{this.state.name}</Text>
                    </View>
                    <View style={{height:44,justifyContent:"center",marginRight:12}}>
                      {/* <Icon name="right" color="#D0D0D0"/> */}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <List style={{marginTop:10}}>
                {/* <Item extra={<Text style={{fontSize:16}}>{'大魔王'}</Text>} onPress={()=> {}}>
                  <Text>昵称</Text>
                </Item> */}
                <Item extra={<Text style={{fontSize:16}}>{this.state.staff.name}</Text>} onPress={()=> {}}>
                  <Text style={{fontSize:15}}>姓名</Text>
                </Item>
                <Item extra={<Text style={{fontSize:16}}>{this.state.staff.phone}</Text>} onPress={()=> {}}>
                  <Text style={{fontSize:15}}>手机号</Text>
                </Item>
              </List>
            </Card.Body>
          </Card>
          <View style={{marginTop:30,alignItems:'center'}}>
            <Button type='primary' size="large" style={{width:'76%',backgroundColor:'#44A754',borderColor:'#44A754'}} activeStyle={{backgroundColor:"#44A754",opacity:0.95}} onPressOut={() => this.logOut()}>退出</Button>
          </View>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {
    let staff = ''
    staff = JSON.parse(await AsyncStorage.getItem('staff'))
    const name = staff.name.substring(staff.name.length-2)
    this.setState({staff,name})
  }
  logOut = () => {
    const _this = this
    Modal.alert('确认退出？', '', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: async () => {
          await AsyncStorage.removeItem('staff', function (error) {
            if (error) {
              console.log('删除失败')
            }else {
              console.log('删除完成')
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'Blank'}),
                ],
              });
              //执行重置路由方法
              _this.props.navigation.dispatch(resetAction)
            }
          })
        }
      },
    ]);
  }
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({
});