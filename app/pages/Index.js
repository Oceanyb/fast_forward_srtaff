import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Home from './Home'
import Login from './Login'
import GoodDetail from './GoodDetail'

class Index extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }

  render() {
    return (
      <Home navigation={this.props.navigation} />
    )
  }
  componentDidMount = () => {
    this.getUpdate()
  }
  getUpdate = async () => {
    const appKey = '49162d0f8d09a1c784f8a99f75ffba32'
    const apiKey = '6de9d1cc5ce4de181da313aae5ac4efd'
    const version = await fetch(`https://www.pgyer.com/apiv2/app/check?_api_key=${apiKey}&appKey=${appKey}`).then(response => response.json())
    console.log(version.data)
    if(version.data != undefined){
      let buildVersion = ''
      try {
        buildVersion = JSON.parse(await AsyncStorage.getItem('buildVersion'))
        if (!buildVersion) {
          AsyncStorage.setItem('buildVersion',JSON.stringify(version.data.buildBuildVersion))
          return
        }else if(buildVersion == version.data.buildBuildVersion){
          console.log('当前已是最新版本。')
        }else{
          const _this = this
          Modal.alert(
            '有新版本，是否安装更新？',
            '版本:0.0.1' + '\n' +
            '新功能:' + '\n'+
            '1.', [
            { text: '否', onPress: () => console.log('取消更新') },
            { text: '是', onPress: () => {
                Linking.openURL(`itms-services://?action=download-manifest&url=https%3A%2F%2Fwww.pgyer.com%2Fapiv2%2Fapp%2Fplist%3FappKey%3D${appKey}%26_api_key%3D${apiKey}`);
                AsyncStorage.setItem('buildVersion',JSON.stringify(version.data.buildBuildVersion))
              }
            },
          ]);
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

const route = createStackNavigator({
  index: {
    screen: Index
  },
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  GoodDetail: {
    screen: GoodDetail
  }
})

export default route