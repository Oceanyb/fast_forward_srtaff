import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button, Card } from 'antd-mobile-rn'

import { XyNavBar } from '../static/libs/MiniXy'
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
      imgsTest:[{url:'http://img.zcool.cn/community/01639e559dec1232f875370ae2497f.jpg'},{url:'http://img.zcool.cn/community/0170c6559deb7d6ac7257aea5a1a93.jpg'},{url:'http://img.zcool.cn/community/018f19559deb796ac7257aea2d2084.jpg'}]
    }
  }

  render() {
    return(
      <View>
        <XyNavBar bgc="#1E78F0" title="商品详情" left='back' nav={this.props.navigation} right="分享" onRightPress={()=>this.state.navigation.navigate('StaffList')}></XyNavBar>
        <ScrollView style={{marginBottom:50}}>
          <Card full>
            <Card.Header
              title={<Text style={{fontSize:18}}>safdsgaetyrhfbfgfhgfjdhf dsfsfhfgjd sfa sdsasttasf </Text>}
            />
            <Card.Body>
              <View style={{flexDirection: 'row',justifyContent:'space-between', marginLeft: 16,marginRight:16}}>
                <Image
                  source={{uri:''}}
                  style={{ width: 88, height: 88, borderRadius: 5 }}
                />
                <View style={{flexDirection: 'column',justifyContent:'space-around',width:"50%"}}>
                  <View style={{flexDirection: 'row',justifyContent:'flex-end',alignItems:'center',flex:1}}>
                    <Text style={{color:'red',fontSize:24 }}>￥ {10692}</Text>
                  </View>
                  <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',flex:1}}>
                    <Text style={{fontSize:18,color:'gray'}}>库存:{30}</Text>
                    <Text style={{fontSize:18,color:'gray'}}>利润:{300}</Text>
                  </View>
                </View>
              </View>
            </Card.Body>
            <View style={{alignItems:'center',marginTop:10}}>
              <View style={{height:0.5,backgroundColor:'#ddd9d5',width:'50%'}}></View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{fontSize:20,margin:16}}>商品详情</Text>
              {this.state.imgsTest.map((item,index) =>
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
            imageUrls={this.state.imgsTest}
            enableImageZoom={true}
            index={this.state.clickNum}
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
    
  }
  imgSize = () => {
    Image.getSize('http://img.zcool.cn/community/0170c6559deb7d6ac7257aea5a1a93.jpg',(width,height) => {})
  }
  imgClick = (v) => {
    console.log('|||||||||');
    this.setState({
      clickNum: v,
      visible:true
    })
  }

}