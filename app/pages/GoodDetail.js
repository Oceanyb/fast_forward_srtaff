import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button, Card } from '@ant-design/react-native'
import Dimensions from 'Dimensions';

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
      height:0
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
                  <Image source={{uri:item.url}} style={{height:this.state.height,margin:5}}/>    
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
    const _this = this
    const goodDetails = this.props.navigation.state.params.goodDetails
    console.log("||||||||",goodDetails)
    const imgs = []
    const imgsView = []
    const sWidth = Dimensions.get('window').width
    for(const i in goodDetails.imgs.split(',')){
      const v = goodDetails.imgs.split(',')[i]
      const url = `http://aisuichu.com:7001/public/upload/${v}`
      Image.getSize(url,(width,height) => {
        if(width > sWidth){
          const scale = width / sWidth
          var fHeight = height / scale
          _this.setState({height:fHeight})
        }else{
          var fHeight = height
          _this.setState({height:fHeight})
        }
      })
      imgs.push({url:url})
      imgsView.push({url:`http://aisuichu.com:7001/public/upload/${v}`})
    }
    this.setState({
      details:goodDetails,
      imgs,
      imgsView
    })
    // console.log('ig',this.state.imgsView)
  }
  imgClick = (v) => {
    this.setState({
      clickNum: v,
      visible:true
    })
  }

}