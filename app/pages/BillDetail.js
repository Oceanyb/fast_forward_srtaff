import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, List, InputItem, Modal, Toast, Icon } from '@ant-design/react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dimensions from 'Dimensions'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

export default class BillDetail extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props,
      status: 'search'
    }
  }

  render() {
    return (
      <View style={{ height:"100%",backgroundColor:'#EFEFEF'}}>
        <XyNavBar bgc="#44A754" title="账单明细" left="back" nav={this.props.navigation} style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{marginBottom:3}}
        >
          <View style={{marginTop:$xy.statusBarH + $xy.navH}}>
            <List style={{marginTop:6}}>
              <Item
                onPress={() => {}}
                thumb={<View style={{borderRadius:22,width:44,height:44,backgroundColor:'#F2A05F'}}></View>}
                extra={<Text style={{fontSize:16,color:'red'}}>{'+ ' + (228.00).toFixed(2)}</Text>}
              >
                <Text style={{marginTop:8,marginLeft:12,fontSize:16}}>
                  {this.state.status == 'search' ? '查询  -  ' : ''}
                </Text>
                <Text style={{marginTop:6,marginBottom:8,marginLeft:12,color:'#AFAFAF'}}>{'2018-12-25 18:48'}</Text>
              </Item>
              <Item
                onPress={() => {}}
                thumb={<View style={{borderRadius:22,width:44,height:44,backgroundColor:'#F2A05F'}}></View>}
                extra={<Text style={{fontSize:16,color:'red'}}>{'+ ' + (500.00).toFixed(2)}</Text>}
              >
                <Text style={{marginTop:8,marginLeft:12,fontSize:16}}>支付宝充值</Text>
                <Text style={{marginTop:6,marginBottom:8,marginLeft:12,color:'#AFAFAF'}}>{'2018-12-25 18:48'}</Text>
              </Item>
            </List>
          </View>
        </ScrollView>
      </View>
    );
  }
  componentDidMount = () => {
    
  }
}

const Item = List.Item
const Brief = Item.Brief

const styles = StyleSheet.create({
});