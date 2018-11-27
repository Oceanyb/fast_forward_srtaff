import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, AsyncStorage, CameraRoll, Platform, PermissionsAndroid, Alert, Clipboard } from 'react-native'
import { TabBar, Button, Card, Toast, Stepper, Modal } from 'antd-mobile-rn'
import * as WeChat from 'react-native-wechat'
import RNFS from 'react-native-fs'

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
      user:{}
    }
  }

  render() {
    console.log(this.state.goodData)
    const _goodData=this.state.goodData
    const { navigate } = this.props.navigation
    if(this.state.user.shop_id){
      return (
        <View style={{ height:"100%"}}>
          <XyNavBar bgc="#1E78F0" title="主页" style={{ position: 'absolute', width: '100%', zIndex: 999 }} right="分享店铺" onRightPress={this.shareShop}></XyNavBar>
          <View style={{marginTop:$xy.statusBarH + $xy.navH,marginBottom:5}}>
            <FlatList
              data={_goodData}
              renderItem={this._renderItem}
              refreshing={false}
              onRefresh={this.refreshing}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
            />
          </View>
        </View>
      )
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
                source={{uri:`http://aisuichu.com:7001/public/upload/${item.item.imgs.split(',')[0]}`}}
                style={{ width: 88, height: 88, borderRadius: 5 }}
              />
              <View style={{flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',width:"50%"}}>
                <View style={{flexDirection: 'column',justifyContent:'space-around',alignItems:'flex-start',height:88,marginRight:8}}>
                  <Text style={{fontSize:18,color:'gray'}}>利润:{item.item.price_sale-item.item.price_agent}</Text>
                  <Text style={{fontSize:18,color:'gray'}}>库存:{item.item.stock}</Text>
                </View>
                <View style={{flexDirection: 'column',justifyContent:'space-around',alignItems:'flex-end',height:88}}>
                  <Text style={{color:'red',fontSize:24 }}>￥{item.item.price_sale}</Text>
                  <Button type='primary' style={{height:34,width:82}} activeStyle={{backgroundColor:"#1E78F0",opacity:0.95}} onPressOut={() => this.shareGood(item)}>分 享</Button>
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
    if(Platform.OS === 'android'){
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera")
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
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
    const res = await _api.get('/moment.onsale',{
      shop_id:user.shop_id
     })
    console.log(res)
    if(res){
      this.setState({
        user:user,
        goodData:res
      })
    }
  }
  shareShop = () => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        console.log('installed');
        Modal.operation([
          { text: '微信好友', onPress: () => {
            WeChat.shareToSession({
            title:'二手手机',
            description: '二手手机',
            thumbImage: `http://aisuichu.com:7001/public/upload/${this.state.goodData[0].imgs.split(',')[0]}`,
            type: 'news',
            webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
          })
          .catch((error) => {console.log("error")})}},
          { text: '朋友圈', onPress: () => {
            WeChat.shareToTimeline({
            title:'二手手机',
            description: '二手手机',
            thumbImage: `http://aisuichu.com:7001/public/upload/${this.state.goodData[0].imgs.split(',')[0]}`,
            type: 'news',
            webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
          })
          .catch((error) => {console.log("error")})}},
        ]);
      } else {
        console.log('fail')
      }
    })
  }
  shareGood = (v) => {
    console.log('item',v)
    console.log('wechat',WeChat);
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        console.log('Installed');
        Modal.operation([
          { text: '朋友圈(多图)', onPress: async () => {
            if(Platform.OS === 'android'){
              const storeLocation = `${RNFS.ExternalDirectoryPath}`;
              for(let i in v.item.imgs.split(',')){
                let pathName = new Date().getTime() + ".png"
                let downloadDest = `${storeLocation}/${pathName}`;
                const ret = RNFS.downloadFile({
                  fromUrl:`http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`,
                  toFile:downloadDest
                });
                ret.promise.then(res => {
                  if(res && res.statusCode === 200){
                    var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
                    promise.then(function(result) {
                      console.log("图片已保存至相册")
                    }).catch(function(error) {
                      // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                      console.log("保存失败",error)
                    })
                  }
                })
              }
              Clipboard.setString(v.item.name)
              WeChat.openWXApp()
            }else{
              console.log('platfrom',Platform.OS)
              for(let i in v.item.imgs.split(',')){
                console.log('1234',v.item.imgs.split(',')[i])
                const fromUrl = `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`
                var promise = CameraRoll.saveToCameraRoll(fromUrl);
                promise.then(function(result) {
                  console.log("图片已保存至相册")
                }).catch(function(error) {
                  // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                  console.log("保存失败",error)
                })
              }
              Clipboard.setString(v.item.name)
              WeChat.openWXApp()
            }
          }},
          // { text: '朋友圈(链接)', onPress: () => {
          //   WeChat.shareToTimeline({
          //   title:'微信朋友圈测试链接',
          //   description: '分享自:江清清的技术专栏(www.lcode.org)',
          //   thumbImage: `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[0]}`,
          //   type: 'news',
          //   webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
          // })
          // .catch((error) => {console.log("error")})}},
          // { text: '微信好友', onPress: () => {
          //   WeChat.shareToSession({
          //   title:'微信好友测试链接',
          //   description: '分享自:江清清的技术专栏(www.lcode.org)',
          //   thumbImage: `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[0]}`,
          //   type: 'news',
          //   webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
          // })
          // .catch((error) => {console.log("error")})}},
        ]);
      } else {
        Alert.alert('失败','请先安装微信后再进行分享!')
      }
    })
  }
}

const styles = StyleSheet.create({

});