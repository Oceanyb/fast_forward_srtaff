import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, AsyncStorage, CameraRoll, Platform, PermissionsAndroid, Alert, Clipboard } from 'react-native'
import { TabBar, Button, Card, Toast, Stepper, Modal, Progress } from 'antd-mobile-rn'
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
      user:{},
      modal1:false,
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
          <XyNavBar bgc="#44A754" title="主页" left="退出" onLeftPress={()=> this.logOut()} style={{ position: 'absolute', width: '100%', zIndex: 999 }} right="分享店铺" onRightPress={this.shareShop}></XyNavBar>
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
            visible={this.state.modal1}
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
                  <Button type='primary' style={{height:34,width:82,borderColor:'#44A754',backgroundColor:'#44A754'}} activeStyle={{backgroundColor:"#44A754",opacity:0.95}} onPressOut={() => this.shareGood(item)}>分 享</Button>
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
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        console.log('installed');
        Modal.operation([
          { text: '微信好友', onPress: () => {
            WeChat.shareToSession({
            title:'今日库存',
            description: '点击查看今日最新库存',
            thumbImage: `http://aisuichu.com:7001/public/upload/${this.state.goodData[0].imgs.split(',')[0]}`,
            type: 'news',
            webpageUrl: `http://aisuichu.com:8083/#/Home?shopId=${this.state.user.shop_id}`
          })
          .catch((error) => {console.log("error")})}},
          { text: '朋友圈', onPress: () => {
            WeChat.shareToTimeline({
            title:'今日库存',
            description: '点击查看今日最新库存',
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
    const _this = this
    _this.setState({percent:0,downloaded:0})
    console.log('item',v)
    console.log('wechat',WeChat);
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        console.log('Installed');
        Modal.operation([
          { text: '朋友圈(多图)', onPress: async () => {
            if(Platform.OS === 'android'){
              this.setState({
                allImg: v.item.imgs.split(',').length,
                modal1:true
              })
              var alength = 0
              const downloadImgs = []
              const storeLocation = `${RNFS.ExternalDirectoryPath}`;
              for(let i in v.item.imgs.split(',')){
                downloadImgs.push(`http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`)
              }
              var pathName = new Date().getTime() + ".png"
              RNFS.downloadFile({
                fromUrl:downloadImgs[0],
                toFile:`${storeLocation}/${pathName}`
              }).promise.then(res => {
                if(res && res.statusCode === 200){
                  console.log(res)
                  CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                    console.log("图片已保存至相册")
                    alength = alength + 1
                    const _per=100/_this.state.allImg
                    _this.setState({percent:_per,downloaded:1})
                    if(v.item.imgs.split(',').length == alength){
                      _this.setState({modal1:false})
                      Clipboard.setString(v.item.name)
                      WeChat.openWXApp()
                      return
                    }
                    pathName = new Date().getTime() + ".png"
                    RNFS.downloadFile({
                      fromUrl:downloadImgs[1],
                      toFile:`${storeLocation}/${pathName}`
                    }).promise.then(res => {
                      if(res && res.statusCode === 200){
                        console.log(res)
                        CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                          console.log("图片已保存至相册")
                          alength = alength + 1
                          const _per=200/_this.state.allImg
                          _this.setState({percent:_per,downloaded:2})
                          if(v.item.imgs.split(',').length == alength){
                            _this.setState({modal1:false})
                            Clipboard.setString(v.item.name)
                            WeChat.openWXApp()
                            return
                          }
                          pathName = new Date().getTime() + ".png"
                          RNFS.downloadFile({
                            fromUrl:downloadImgs[2],
                            toFile:`${storeLocation}/${pathName}`
                          }).promise.then(res => {
                            if(res && res.statusCode === 200){
                              console.log(res)
                              CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                console.log("图片已保存至相册")
                                alength = alength + 1
                                const _per=300/_this.state.allImg
                                _this.setState({percent:_per,downloaded:3})
                                if(v.item.imgs.split(',').length == alength){
                                  _this.setState({modal1:false})
                                  Clipboard.setString(v.item.name)
                                  WeChat.openWXApp()
                                  return
                                }
                                pathName = new Date().getTime() + ".png"
                                RNFS.downloadFile({
                                  fromUrl:downloadImgs[3],
                                  toFile:`${storeLocation}/${pathName}`
                                }).promise.then(res => {
                                  if(res && res.statusCode === 200){
                                    console.log(res)
                                    CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                      console.log("图片已保存至相册")
                                      alength = alength + 1
                                      const _per=400/_this.state.allImg
                                      _this.setState({percent:_per,downloaded:4})
                                      if(v.item.imgs.split(',').length == alength){
                                        _this.setState({modal1:false})
                                        Clipboard.setString(v.item.name)
                                        WeChat.openWXApp()
                                        return
                                      }
                                      pathName = new Date().getTime() + ".png"
                                      RNFS.downloadFile({
                                        fromUrl:downloadImgs[4],
                                        toFile:`${storeLocation}/${pathName}`
                                      }).promise.then(res => {
                                        if(res && res.statusCode === 200){
                                          console.log(res)
                                          CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                            console.log("图片已保存至相册")
                                            const _per=500/_this.state.allImg
                                            _this.setState({percent:_per,downloaded:5})
                                            alength = alength + 1
                                            if(v.item.imgs.split(',').length == alength){
                                              _this.setState({modal1:false})
                                              Clipboard.setString(v.item.name)
                                              WeChat.openWXApp()
                                              return
                                            }
                                            pathName = new Date().getTime() + ".png"
                                            RNFS.downloadFile({
                                              fromUrl:downloadImgs[5],
                                              toFile:`${storeLocation}/${pathName}`
                                            }).promise.then(res => {
                                              if(res && res.statusCode === 200){
                                                console.log(res)
                                                CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                                  console.log("图片已保存至相册")
                                                  alength = alength + 1
                                                  const _per=600/_this.state.allImg
                                                  _this.setState({percent:_per,downloaded:6})
                                                  if(v.item.imgs.split(',').length == alength){
                                                    _this.setState({modal1:false})
                                                    Clipboard.setString(v.item.name)
                                                    WeChat.openWXApp()
                                                    return
                                                  }
                                                  pathName = new Date().getTime() + ".png"
                                                  RNFS.downloadFile({
                                                    fromUrl:downloadImgs[6],
                                                    toFile:`${storeLocation}/${pathName}`
                                                  }).promise.then(res => {
                                                    if(res && res.statusCode === 200){
                                                      console.log(res)
                                                      CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                                        console.log("图片已保存至相册")
                                                        alength = alength + 1
                                                        const _per=700/_this.state.allImg
                                                        _this.setState({percent:_per,downloaded:7})
                                                        if(v.item.imgs.split(',').length == alength){
                                                          _this.setState({modal1:false})
                                                          Clipboard.setString(v.item.name)
                                                          WeChat.openWXApp()
                                                          return
                                                        }
                                                        pathName = new Date().getTime() + ".png"
                                                        RNFS.downloadFile({
                                                          fromUrl:downloadImgs[7],
                                                          toFile:`${storeLocation}/${pathName}`
                                                        }).promise.then(res => {
                                                          if(res && res.statusCode === 200){
                                                            console.log(res)
                                                            CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                                              console.log("图片已保存至相册")
                                                              alength = alength + 1
                                                              const _per=800/_this.state.allImg
                                                              _this.setState({percent:_per,downloaded:8})
                                                              if(v.item.imgs.split(',').length == alength){
                                                                _this.setState({modal1:false})
                                                                Clipboard.setString(v.item.name)
                                                                WeChat.openWXApp()
                                                                return
                                                              }
                                                              pathName = new Date().getTime() + ".png"
                                                              RNFS.downloadFile({
                                                                fromUrl:downloadImgs[8],
                                                                toFile:`${storeLocation}/${pathName}`
                                                              }).promise.then(res => {
                                                                if(res && res.statusCode === 200){
                                                                  console.log(res)
                                                                  CameraRoll.saveToCameraRoll("file://" + `${storeLocation}/${pathName}`).then(function(result) {
                                                                    console.log("图片已保存至相册")
                                                                    alength = alength + 1
                                                                    const _per=900/_this.state.allImg
                                                                    _this.setState({percent:_per,downloaded:9})
                                                                    if(v.item.imgs.split(',').length == alength){
                                                                      _this.setState({modal1:false})
                                                                      Clipboard.setString(v.item.name)
                                                                      WeChat.openWXApp()
                                                                      return
                                                                    }
                                                                  })
                                                                }
                                                              })
                                                            })
                                                          }
                                                        })
                                                      })
                                                    }
                                                  })
                                                })
                                              }
                                            })
                                          })
                                        }
                                      })
                                    })
                                  }
                                })
                              })
                            }
                          })
                        })
                      }
                    })
                  })
                }
              })
              // for(let i in v.item.imgs.split(',')){
              //   let pathName = new Date().getTime() + ".png"
              //   let downloadDest = `${storeLocation}/${pathName}`;
              //   const ret = RNFS.downloadFile({
              //     fromUrl:`http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`,
              //     toFile:downloadDest
              //   });
              //   ret.promise.then(res => {
              //     if(res && res.statusCode === 200){
              //       this.state.downloadImgs.push("file://" + downloadDest)
              //       console.log("imgs",downloadImgs)
              //       // var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
              //       // promise.then(function(result) {
              //       //   console.log("图片已保存至相册")
              //       //   alength = alength + 1
              //       //   if(v.item.imgs.split(',').length == alength){
              //       //     Clipboard.setString(v.item.name)
              //       //     WeChat.openWXApp()
              //       //   }
              //       // }).catch(function(error) {
              //       //   // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
              //       //   console.log("保存失败",error)
              //       // })
              //     }
              //   })
              // }
              
            }else{
              console.log('LibraryDirectoryPath=' + RNFS.LibraryDirectoryPath)
              var ilength = 0
              const storeLocation = `${RNFS.LibraryDirectoryPath}`;
              console.log('platfrom',Platform.OS)
              // for(let i in v.item.imgs.split(',')){
                // console.log('1234',v.item.imgs.split(',')[i])
                // let pathName = new Date().getTime() + ".png"
                // let downloadDest = `${storeLocation}/${pathName}`;
                // const ret = RNFS.downloadFile({
                //   fromUrl:`http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`,
                //   toFile:downloadDest
                // });
                // console.log("download",ret)
                // ret.promise.then(res => {
                //   if(res && res.statusCode === 200){
                //     var promise = CameraRoll.saveToCameraRoll(downloadDest);
                //     promise.then(function(result) {
                //       console.log("图片已保存至相册")
                //       ilength = ilength + 1
                //       if(v.item.imgs.split(',').length == ilength){
                //         Clipboard.setString(v.item.name)
                //         WeChat.openWXApp()
                //       }
                //     }).catch(function(error) {
                //       // Alert.alert("分享失败","请在'系统设置'中打开'存储权限'后再进行分享!")
                //       console.log("保存失败",error)
                //     })
                //   }
                // }
                Toast.loading('原图下载中...', 3, () => {
                  console.log('Load complete !!!');
                });
                const fromUrl = []
                for(let i in v.item.imgs.split(',')){
                  fromUrl.push(`http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[i]}`)
                }
                CameraRoll.saveToCameraRoll(fromUrl[0]).then(function(result) {
                  console.log("图片已保存至相册")
                  ilength = ilength + 1
                  if(v.item.imgs.split(',').length == ilength){
                    Clipboard.setString(v.item.name)
                    WeChat.openWXApp()
                    return
                  }
                  CameraRoll.saveToCameraRoll(fromUrl[1]).then(function(result) {
                    console.log("图片已保存至相册")
                    ilength = ilength + 1
                    if(v.item.imgs.split(',').length == ilength){
                      Clipboard.setString(v.item.name)
                      WeChat.openWXApp()
                      return
                    }
                    CameraRoll.saveToCameraRoll(fromUrl[2]).then(function(result) {
                      console.log("图片已保存至相册")
                      ilength = ilength + 1
                      if(v.item.imgs.split(',').length == ilength){
                        Clipboard.setString(v.item.name)
                        WeChat.openWXApp()
                        return
                      }
                      CameraRoll.saveToCameraRoll(fromUrl[3]).then(function(result) {
                        console.log("图片已保存至相册")
                        ilength = ilength + 1
                        if(v.item.imgs.split(',').length == ilength){
                          Clipboard.setString(v.item.name)
                          WeChat.openWXApp()
                          return
                        }
                        CameraRoll.saveToCameraRoll(fromUrl[4]).then(function(result) {
                          console.log("图片已保存至相册")
                          ilength = ilength + 1
                          if(v.item.imgs.split(',').length == ilength){
                            Clipboard.setString(v.item.name)
                            WeChat.openWXApp()
                            return
                          }
                          CameraRoll.saveToCameraRoll(fromUrl[5]).then(function(result) {
                            console.log("图片已保存至相册")
                            ilength = ilength + 1
                            if(v.item.imgs.split(',').length == ilength){
                              Clipboard.setString(v.item.name)
                              WeChat.openWXApp()
                              return
                            }CameraRoll.saveToCameraRoll(fromUrl[6]).then(function(result) {
                              console.log("图片已保存至相册")
                              ilength = ilength + 1
                              if(v.item.imgs.split(',').length == ilength){
                                Clipboard.setString(v.item.name)
                                WeChat.openWXApp()
                                return
                              }
                              CameraRoll.saveToCameraRoll(fromUrl[7]).then(function(result) {
                                console.log("图片已保存至相册")
                                ilength = ilength + 1
                                if(v.item.imgs.split(',').length == ilength){
                                  Clipboard.setString(v.item.name)
                                  WeChat.openWXApp()
                                  return
                                }
                                CameraRoll.saveToCameraRoll(fromUrl[8]).then(function(result) {
                                  console.log("图片已保存至相册")
                                  ilength = ilength + 1
                                  if(v.item.imgs.split(',').length == ilength){
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
              // }
            }
          }},
          { text: '朋友圈(链接)', onPress: () => {
            Clipboard.setString(v.item.name)
            WeChat.shareToTimeline({
            title:v.item.name,
            thumbImage: `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[0]}`,
            type: 'news',
            webpageUrl: `http://aisuichu.com:8083/#/GoodDetail?shopId=${this.state.user.shop_id}&goodId=${v.item.id}`
          })
          .catch((error) => {console.log("error")})}},
          { text: '微信好友', onPress: () => {
            Clipboard.setString(v.item.name)
            WeChat.shareToSession({
            title:v.item.name,
            description: '------------' + '\n' + '售价：' + v.item.price_sale + '\n' + '点击查看更多详情',
            thumbImage: `http://aisuichu.com:7001/public/upload/${v.item.imgs.split(',')[0]}`,
            type: 'news',
            webpageUrl: `http://aisuichu.com:8083/#/GoodDetail?shopId=${this.state.user.shop_id}&goodId=${v.item.id}`
          })
          .catch((error) => {console.log("error")})}},
        ]);
      } else {
        Alert.alert('失败','请先安装微信后再进行分享!')
      }
    })
  }
}

const styles = StyleSheet.create({

});