import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, AsyncStorage, CameraRoll, Platform, PermissionsAndroid, Alert, Clipboard } from 'react-native'
import { TabBar, Button, Card, Toast, Stepper, Modal, Progress, ActionSheet } from '@ant-design/react-native'
import * as WeChat from 'react-native-wechat'
import RNFS from 'react-native-fs'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'

import $xy from '../static/styles/xyui'

WeChat.registerApp('wx273058173cd103d4');

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
      user:{},
      modal:false,
      percent:0,
      allImg:'',
      downloaded:0
    }
  }

  render() {
    console.log(this.state.goodData)
    const _goodData=this.state.goodData
    const { navigate } = this.props.navigation
    if(this.state.user.shop_id){
      return (
        <View style={{ height:"100%"}}>
          <XyNavBar bgc="#44A754" title="主页" left="退出" onLeftPress={()=> this.logOut()} style={{ position: 'absolute', width: '100%', zIndex: 999 }}>
            <Button solt="right" type="primary" size="large" style={{borderRadius:0,backgroundColor:'#44A754',borderColor:'#44A754',height:42}} activeStyle={{backgroundColor:"#44A754",opacity:0.95}} onPressOut={ () => this.shareShop() } >分享店铺</Button>
          </XyNavBar>
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
          <Modal
            visible={this.state.modal}
            transparent
            maskClosable={false}
            title="原图下载中......"
          >
            <View style={{marginTop:20,marginBottom:8,position:'relative',alignItems:'flex-end'}}>
              <Text style={{fontSize:16}}>{this.state.downloaded}/{this.state.allImg}</Text>
            </View>
            <Progress style={{marginBottom:8}} percent={this.state.percent} />
          </Modal>
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
                  <Button type='primary' style={{height:34,width:82,borderColor:'#44A754',backgroundColor:'#44A754'}} activeStyle={{backgroundColor:"#44A754",opacity:0.95}} onPressOut={() => this.shareGoods(item)}>分 享</Button>
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
  logOut = () => {
    const _this = this
    Modal.alert('确认退出？', '', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: async () => {
          await AsyncStorage.removeItem('user', function (error) {
            if (error) {
              console.log('删除失败')
            }else {
              console.log('删除完成')
              _this.state.navigation.replace('Home')    
            }
          })
        }
      },
    ]);
  }
  refreshing = () => {
    this.props.navigation.replace('Home')
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
        this.state.navigation.replace('Login')
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
    if(this.state.goodData.length){
      WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          const Buttons = [
            '微信好友',
            '朋友圈',
            '取消'
          ];
          ActionSheet.showActionSheetWithOptions(
            {
              options: Buttons,
              cancelButtonIndex: 2
            },
            (buttonIndex) => {
              if(buttonIndex==0){
                WeChat.shareToSession({
                  title:'今日库存',
                  description: '点击查看今日最新库存',
                  thumbImage: `http://aisuichu.com:7001/public/upload/${this.state.goodData[0].imgs.split(',')[0]}`,
                  type: 'news',
                  webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
                })
              }else if(buttonIndex==1){
                WeChat.shareToTimeline({
                  title:'今日库存',
                  description: '点击查看今日最新库存',
                  thumbImage: `http://aisuichu.com:7001/public/upload/${this.state.goodData[0].imgs.split(',')[0]}`,
                  type: 'news',
                  webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
                })
              }else{}
            }
          ) 
        }else{
          console.log("没有安装！")
        }
      })
    } else {
      Toast.fail('请添加商品后再进行店铺分享！',0.8)
    }
  }
  shareGoods = (v) => {
    const _this = this
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if(isInstalled) {
          const Buttons = [
            '微信好友',
            '朋友圈(链接)',
            '朋友圈(多图)',
            '取消'
          ];
          ActionSheet.showActionSheetWithOptions(
            {
              options: Buttons,
              cancelButtonIndex: 3
            },
            (buttonIndex) => {
              if(buttonIndex==0){
                Clipboard.setString(v.item.name)
                WeChat.shareToSession({
                  title:v.item.name,
                  description: '------------' + '\n' + '售价：' + v.item.price_sale + '\n' + '点击查看更多详情',
                  thumbImage: `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[0]}`,
                  type: 'news',
                  webpageUrl: `http://aisuichu.com:8083/#/GoodDetail?shopId=${this.state.user.shop_id}&goodId=${v.item.id}`
                })
              }else if(buttonIndex==1){
                Clipboard.setString(v.item.name)
                WeChat.shareToTimeline({
                  title:v.item.name,
                  thumbImage: `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[0]}`,
                  type: 'news',
                  webpageUrl: `http://aisuichu.com:8083/#/GoodDetail?shopId=${this.state.user.shop_id}&goodId=${v.item.id}`
                })
              }else if(buttonIndex==2){
                this.setState({
                  allImg: v.item.imgs.split(',').length,
                  modal:true
                })
                console.log("|||",this.state.allImg)
                var ilength = 0
                console.log('platfrom',Platform.OS)
                  // /*
                  const fromUrl = []
                  for(let i in v.item.imgs.split(',')){
                    fromUrl.push(`http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`)
                  }
                  CameraRoll.saveToCameraRoll(fromUrl[0]).then(function(result) {
                    console.log("图片已保存至相册")
                    ilength = ilength + 1
                    const _per = 100 / _this.state.allImg
                    _this.setState({percent:_per,downloaded:1})
                    if(v.item.imgs.split(',').length == ilength){
                      _this.setState({modal:false,percent:0,downloaded:0})
                      Clipboard.setString(v.item.name)
                      WeChat.openWXApp()
                      return
                    }
                    CameraRoll.saveToCameraRoll(fromUrl[1]).then(function(result) {
                      console.log("图片已保存至相册")
                      ilength = ilength + 1
                      const _per = 200 / _this.state.allImg
                      _this.setState({percent:_per,downloaded:2})
                      if(v.item.imgs.split(',').length == ilength){
                        _this.setState({modal:false,percent:0,downloaded:0})
                        Clipboard.setString(v.item.name)
                        WeChat.openWXApp()
                        return
                      }
                      CameraRoll.saveToCameraRoll(fromUrl[2]).then(function(result) {
                        console.log("图片已保存至相册")
                        ilength = ilength + 1
                        const _per = 300 / _this.state.allImg
                        _this.setState({percent:_per,downloaded:3})
                        if(v.item.imgs.split(',').length == ilength){
                          _this.setState({modal:false,percent:0,downloaded:0})
                          Clipboard.setString(v.item.name)
                          WeChat.openWXApp()
                          return
                        }
                        CameraRoll.saveToCameraRoll(fromUrl[3]).then(function(result) {
                          console.log("图片已保存至相册")
                          ilength = ilength + 1
                          const _per = 400 / _this.state.allImg
                          _this.setState({percent:_per,downloaded:4})
                          if(v.item.imgs.split(',').length == ilength){
                            _this.setState({modal:false,percent:0,downloaded:0})
                            Clipboard.setString(v.item.name)
                            WeChat.openWXApp()
                            return
                          }
                          CameraRoll.saveToCameraRoll(fromUrl[4]).then(function(result) {
                            console.log("图片已保存至相册")
                            ilength = ilength + 1
                            const _per = 500 / _this.state.allImg
                            _this.setState({percent:_per,downloaded:5})
                            if(v.item.imgs.split(',').length == ilength){
                              _this.setState({modal:false,percent:0,downloaded:0})
                              Clipboard.setString(v.item.name)
                              WeChat.openWXApp()
                              return
                            }
                            CameraRoll.saveToCameraRoll(fromUrl[5]).then(function(result) {
                              console.log("图片已保存至相册")
                              ilength = ilength + 1
                              const _per = 600 / _this.state.allImg
                              _this.setState({percent:_per,downloaded:6})
                              if(v.item.imgs.split(',').length == ilength){
                                _this.setState({modal:false,percent:0,downloaded:0})
                                Clipboard.setString(v.item.name)
                                WeChat.openWXApp()
                                return
                              }CameraRoll.saveToCameraRoll(fromUrl[6]).then(function(result) {
                                console.log("图片已保存至相册")
                                ilength = ilength + 1
                                const _per = 700 / _this.state.allImg
                                _this.setState({percent:_per,downloaded:7})
                                if(v.item.imgs.split(',').length == ilength){
                                  _this.setState({modal:false,percent:0,downloaded:0})
                                  Clipboard.setString(v.item.name)
                                  WeChat.openWXApp()
                                  return
                                }
                                CameraRoll.saveToCameraRoll(fromUrl[7]).then(function(result) {
                                  console.log("图片已保存至相册")
                                  ilength = ilength + 1
                                  const _per = 800 / _this.state.allImg
                                  _this.setState({percent:_per,downloaded:8})
                                  if(v.item.imgs.split(',').length == ilength){
                                    _this.setState({modal:false,percent:0,downloaded:0})
                                    Clipboard.setString(v.item.name)
                                    WeChat.openWXApp()
                                    return
                                  }
                                  CameraRoll.saveToCameraRoll(fromUrl[8]).then(function(result) {
                                    console.log("图片已保存至相册")
                                    ilength = ilength + 1
                                    const _per = 900 / _this.state.allImg
                                    _this.setState({percent:_per,downloaded:9})
                                    if(v.item.imgs.split(',').length == ilength){
                                      _this.setState({modal:false,percent:0,downloaded:0})
                                      Clipboard.setString(v.item.name)
                                      WeChat.openWXApp()
                                      return
                                    }
                                  }).catch(function(error) {
                                    // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                                    console.log("保存失败",error)
                                  })
                                }).catch(function(error) {
                                  // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                                  console.log("保存失败",error)
                                })
                              }).catch(function(error) {
                                // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                                console.log("保存失败",error)
                              })
                            }).catch(function(error) {
                              // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                              console.log("保存失败",error)
                            })
                          }).catch(function(error) {
                            // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                            console.log("保存失败",error)
                          })
                        }).catch(function(error) {
                          // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                          console.log("保存失败",error)
                        })
                      }).catch(function(error) {
                        // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                        console.log("保存失败",error)
                      })
                    }).catch(function(error) {
                      // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                      console.log("保存失败",error)
                    })
                  }).catch(function(error) {
                    // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                    console.log("保存失败",error)
                  })
              }else{}
            }
          ) 
        }else{
          console.log("没有安装！")
        }
      }
    )
  }
}

const styles = StyleSheet.create({

});