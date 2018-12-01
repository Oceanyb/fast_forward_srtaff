import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button, Card } from 'antd-mobile-rn'

import { XyNavBar } from '../static/libs/MiniXy'
import _api from '../static/libs/apiRequest'
import ImageViewer from 'react-native-image-zoom-viewer'

import $xy from '../static/styles/xyui'

export default class GoodDetail extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      ...props,
      visible:false,
      clickNum:'',
      details:{},
      imgs:[],
      imgsView:[],
      imgsTest:[{url:'http://img.zcool.cn/community/01639e559dec1232f875370ae2497f.jpg'},{url:'http://img.zcool.cn/community/0170c6559deb7d6ac7257aea5a1a93.jpg'},{url:'http://img.zcool.cn/community/018f19559deb796ac7257aea2d2084.jpg'}]
    }
  }

  render() {
    return(
      <View>
        <XyNavBar bgc="#44A754" title="商品详情" left='back' nav={this.props.navigation}></XyNavBar>
        <ScrollView style={{marginBottom:50}}>
          <Card full>
            <Card.Header
              title={<Text style={{fontSize:18}}>{this.state.details.name}</Text>}
            />
            <Card.Body>
              <View style={{flexDirection: 'row',justifyContent:'space-between', marginLeft: 16,marginRight:16, marginTop:5 }}>
                <Image
                  source={{uri:`http://aisuichu.com:7001/public/upload/${this.props.navigation.state.params.goodDetails.imgs.split(',')[0]}`}}
                  style={{ width: 88, height: 88, borderRadius: 5 }}
                />
                <View style={{flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',width:"50%"}}>
                  <View style={{flexDirection: 'column',justifyContent:'flex-end',height:88,marginRight:10}}>
                    <Text style={{fontSize:18,color:'gray',paddingBottom:10}}>库存:{this.state.details.stock}</Text>
                  </View>
                  <View style={{flexDirection: 'column',justifyContent:'space-around',alignItems:'flex-end',height:88}}>
                    <Text style={{color:'red',fontSize:24 }}>￥{this.state.details.price_sale}</Text>
                    <Text style={{fontSize:18,color:'gray'}}>利润:{this.state.details.price_sale - this.state.details.price_agent}</Text>
                  </View>
                </View>
              </View>
            </Card.Body>
            <View style={{alignItems:'center',marginTop:10}}>
              <View style={{height:0.5,backgroundColor:'#ddd9d5',width:'50%'}}></View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{fontSize:20,margin:16}}>商品详情</Text>
              {this.state.imgs.map((item,index) =>
                <TouchableWithoutFeedback onPress={() => this.imgClick(index)}  key={index}>
                  <Image source={{uri:item.url}} style={{height:667,margin:5}}/>    
                </TouchableWithoutFeedback>
              )}
            </View>
          </Card>
        </ScrollView>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {}}
        >
          <ImageViewer
            imageUrls={this.state.imgsView}
            enableImageZoom={true}
            index={this.state.clickNum}
            saveToLocalByLongPress={false}
            onChange={(index) => {}}
            onClick={() => {
              this.setState({
                visible:false
              });
            }}
          />
        </Modal>
      </View>
    )
  }
  componentDidMount = () => {
    console.log("||||",this.props)
    const goodDetails = this.props.navigation.state.params.goodDetails
    console.log("||||||||",goodDetails)
    const imgs = []
    const imgsView = []
    for(const i in goodDetails.imgs.split(',')){
      const v = goodDetails.imgs.split(',')[i]
      imgs.push({url:`http://aisuichu.com:7001/public/upload/${v}`, id: new Date().getTime(), data: '', fileName: v })
      imgsView.push({url:`http://aisuichu.com:7001/public/upload/${v}`})
    }
    this.setState({
      details:goodDetails,
      imgs,
      imgsView
    })
    console.log('ig',this.state.imgsView)
  }
  imgSize = () => {
    Image.getSize('http://img.zcool.cn/community/0170c6559deb7d6ac7257aea5a1a93.jpg',(width,height) => {})
  }
  imgClick = (v) => {
    this.setState({
      clickNum: v,
      visible:true
    })
  }

}