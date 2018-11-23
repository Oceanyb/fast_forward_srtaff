import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, AsyncStorage } from 'react-native'
import { TabBar, Button, Card, Toast, Stepper } from 'antd-mobile-rn'
import * as WeChat from 'react-native-wechat'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

WeChat.registerApp('wx0ff5a6c6cb1f72ac');

type Props = {};
export default class Home extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props){
    super(props);
    this.state={
      ...props,
      detail:'有保修期,超级优势,优势价格,大内存iPhoneX 256g,白色美版两网无锁移动联通双4g,成色98左右,超级优势,优势价格 4869',
      goodData:[],
      testData:[
        {
          id:'12108',
          name:'有保修期,超级优势,优势价格,大内存iPhoneX 256g,白色美版两网无锁移动联通双4g,成色98左右,超级优势,优势价格 4869',
          price_sale:'1958',
          price_agent:'1388',
          stock:'8',
          imgs:['01639e559dec1232f875370ae2497f.jpg','018f19559deb796ac7257aea2d2084.jpg','0170c6559deb7d6ac7257aea5a1a93.jpg']
        },
        {
          id:'12108',
          name:'有保修期,超级优势,优势价格,大内存iPhoneX 256g,白色美版两网无锁移动联通双4g,成色98左右,超级优势,优势价格 4869',
          price_sale:'1458',
          price_agent:'1388',
          stock:'8',
          imgs:['0170c6559deb7d6ac7257aea5a1a93.jpg','01639e559dec1232f875370ae2497f.jpg','018f19559deb796ac7257aea2d2084.jpg']
        },
        {
          id:'12108',
          name:'有保修期,超级优势,优势价格,大内存iPhoneX 256g,白色美版两网无锁移动联通双4g,成色98左右,超级优势,优势价格 4869',
          price_sale:'1058',
          price_agent:'998',
          stock:'8',
          imgs:['018f19559deb796ac7257aea2d2084.jpg','0170c6559deb7d6ac7257aea5a1a93.jpg','01639e559dec1232f875370ae2497f.jpg']
        },
        {
          id:'12109',
          name:'有保修期,超级优势,优势价格,大内存iPhoneX 256g,白色美版两网无锁移动联通双4g,成色98左右,超级优势,优势价格 4869',
          price_sale:'1698',
          price_agent:'1388',
          stock:'2',
          imgs:['0170c6559deb7d6ac7257aea5a1a93.jpg','018f19559deb796ac7257aea2d2084.jpg','01639e559dec1232f875370ae2497f.jpg']
        },
        {
          id:'12110',
          name:'有保修期,超级优势,优势价格,大内存iPhoneX 256g,白色美版两网无锁移动联通双4g,成色98左右,超级优势,优势价格 4869',
          price_sale:'1588',
          price_agent:'1388',
          stock:'8',
          imgs:['0170c6559deb7d6ac7257aea5a1a93.jpg','01639e559dec1232f875370ae2497f.jpg','018f19559deb796ac7257aea2d2084.jpg']
        }
      ]
    }
  }

  render() {
    console.log(this.state.goodData)
    const _goodData=this.state.goodData
    const { navigate } = this.props.navigation;
    if(_goodData.length>=0){
      return (
        <View style={{ height:"100%"}}>
          <XyNavBar bgc="#1E78F0" title="主页" style={{ position: 'absolute', width: '100%', zIndex: 999 }} right="分享店铺" onRightPress={this.shareTest}></XyNavBar>
          <View style={{marginTop:$xy.statusBarH + $xy.navH,marginBottom:5}}>
            <FlatList
              data={this.state.testData}
              renderItem={this._renderItem}
              refreshing={false}
              onRefresh={this.refreshing}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
            />
          </View>
        </View>
      );
    }else{
      return(<View></View>)
    }
  }
  _renderItem = (item) => {
    return(
      <TouchableWithoutFeedback onPress={()=>{this.state.navigation.navigate('GoodDetail',{goodDetails:item.item}),console.log(item)}}>
        <Card style={{margin:3}}>
          <Card.Header
            title={<Text style={{fontSize:18}}>{item.item.name}</Text>}
          />
          <Card.Body>
            <View style={{flexDirection: 'row',justifyContent:'space-between', marginLeft: 16,marginRight:16}}>
              <Image
                source={{uri:`http://img.zcool.cn/community/${item.item.imgs[0]}`}}
                style={{ width: 88, height: 88, borderRadius: 5 }}
              />
              <View style={{flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',width:"50%"}}>
                <View style={{flexDirection: 'column',justifyContent:'space-around',alignItems:'flex-start',height:88,marginRight:8}}>
                  <Text style={{fontSize:18,color:'gray'}}>利润:{item.item.price_sale-item.item.price_agent}</Text>
                  <Text style={{fontSize:18,color:'gray'}}>库存:{item.item.stock}</Text>
                </View>
                <View style={{flexDirection: 'column',justifyContent:'space-around',alignItems:'flex-end',height:88}}>
                  <Text style={{color:'red',fontSize:24 }}>￥{item.item.price_sale}</Text>
                  <Button type='primary' style={{height:34,width:82}} activeStyle={{backgroundColor:"#1E78F0",opacity:0.95}} onPressOut={this.shareTest}>分 享</Button>
                </View>
              </View>
            </View>
          </Card.Body>
        </Card>
      </TouchableWithoutFeedback>
    )
  }
  componentDidMount = async () => {
    console.log('props',this.props)
    this.getData()
  }
  refreshing = () => {
    this.props.navigation.replace('Home')
    let timer =  setTimeout(()=>{
      clearTimeout(timer)
        Toast.info('刷新成功!',1)
      },1000)
  }
  onChanged=(value)=>{
    console.log('changed', value)
  }
  getData = async () => {
    console.log('storage',AsyncStorage.getItem('user'))
    let user = ''
    try {
      user = JSON.parse(await AsyncStorage.getItem('user'))
      if (!user) {
        this.state.navigation.navigate('Login')
        return
      }
    } catch (e) {
      console.log(e)
    }
    console.log('==',user.shop_id)
    // const res = await _api.get('/moment.onsale',{
    //   shop_id:user.shop_id
    //  })
    // console.log(res.headers.get('content-type'))
    // if(res){
    //   this.setState({
    //     goodData:res
    //   })
    // }
  }
  shareTest = () => {
    console.log('wechat',WeChat);
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        //发送授权请求
        console.log('success');
        WeChat.shareToSession({
          title:'微信朋友圈测试链接',
          description: '分享自:江清清的技术专栏(www.lcode.org)',
          thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
          type: 'news',
          webpageUrl: 'http://www.lcode.org'
        })
        .catch((error) => {console.log("sadasfafasfafafaaf")});
      } else {
        console.log('fail')
      }
    })
  }
}

const styles = StyleSheet.create({

});