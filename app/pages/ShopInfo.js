import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, Modal, Toast, Icon, List, TextareaItem } from '@ant-design/react-native'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class ShopInfo extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props,
      user:{},
      text:'快速转发工具哪家好用？没听错，就是随出库存App，库存管理转发，就在弹指之间！',
    }
  }

  render() {
    return (
      <View style={{ height:"100%",backgroundColor:'#EFEFEF'}}>
        <XyNavBar bgc="#44A754" title="店铺信息" left="back" nav={this.props.navigation} style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$xy.statusBarH + $xy.navH}}>
          <Card full style={{marginTop:6,paddingBottom:0}}>
            <Card.Body style={{paddingBottom:0}}>
              <TouchableWithoutFeedback onPress={() => {}}>        
                <View style={{height:88,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:14}}>
                  <Text style={{fontSize:18}}>店铺图标</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:78,width:78,backgroundColor:'#E1E1E1',marginRight:6}}></View>
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
                <Item extra={<Text style={{fontSize:16}}>{'小明'}</Text>} onPress={()=> {}}>
                  <Text style={{fontSize:15}}>店铺编号</Text>
                </Item>
                <Item extra={<Text style={{fontSize:16}}>{'18000000002'}</Text>} onPress={()=> {}}>
                  <Text style={{fontSize:15}}>店铺名称</Text>
                </Item>
                <Item style={{paddingVertical:0}}>
                  <View>
                    <Text style={{fontSize:15,marginTop:5}}>店铺简介</Text>
                    <TextareaItem
                      rows={5}
                      value={this.state.text}
                      placeholder="暂无简介"
                      style={{ paddingHorizontal:0,marginTop:10,color:'#6f6f6f' }}
                      editable={false}
                    />
                  </View>
                </Item>
              </List>
            </Card.Body>
          </Card>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {}
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({
  bottom_button:{
    position:"absolute",
    width:"100%",
    bottom:0
  }
});