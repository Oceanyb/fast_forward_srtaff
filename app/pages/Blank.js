import React, { Component } from 'react';
import { View, AsyncStorage, StatusBar, Linking, Platform, Alert } from 'react-native';
import { Modal } from '@ant-design/react-native'
import { isFirstTime, isRolledBack, checkUpdate, downloadUpdate, switchVersion, markSuccess } from 'react-native-update';

import _updateConfig from '../../update.json';
const { appKey } = _updateConfig[Platform.OS];

export default class Blank extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props
    }
  }

  render() {
    return (
      <View style={{ height:"100%"}}>
        <StatusBar hidden={true}/>
      </View>
    );
  }
  componentDidMount = async () => {
    this.checkUpdate()
    if (isFirstTime) {
      markSuccess()
    } else if (isRolledBack) {
      Alert.alert('提示', '更新失败,关闭软件后重试！');
    }
    let staff = ''
    try {
      staff = JSON.parse(await AsyncStorage.getItem('staff'))
      if (!staff) {
        this.state.navigation.replace('Login')
        return
      }else{
        this.state.navigation.replace('TabNav')
      }
    } catch (e) {
      console.log(e)
    }
  }
  doUpdate = (info) => {
    downloadUpdate(info).then((hash) => {
      switchVersion(hash)
    }).catch(err => { 
      Alert.alert('提示', '更新失败!');
    });
  };
  checkUpdate = () => {
    checkUpdate(appKey).then((info) => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        ]);
      } else if (info.upToDate) {
        console.log('提示:您的应用版本已是最新.');
      } else {
        Alert.alert('提示', '检查到新的版本'+info.name+'\n是否下载?\n'+ info.description, [
          {text: '是', onPress: ()=>{this.doUpdate(info)}},
          {text: '否',},
        ]);
      }
    }).catch(err => { 
      Alert.alert('提示', '更新失败！');
    });
  };
  // getUpdate = async () => {
  //   const appKey = '49162d0f8d09a1c784f8a99f75ffba32'
  //   const apiKey = '6de9d1cc5ce4de181da313aae5ac4efd'
  //   const version = await fetch(`https://www.pgyer.com/apiv2/app/check?_api_key=${apiKey}&appKey=${appKey}`).then(response => response.json())
  //   // console.log(version.data)
  //   if(version.data != undefined){
  //     let buildVersion = ''
  //     try {
  //       buildVersion = JSON.parse(await AsyncStorage.getItem('buildVersion'))
  //       if (!buildVersion) {
  //         AsyncStorage.setItem('buildVersion',JSON.stringify(version.data.buildBuildVersion))
  //         return
  //       }else if(buildVersion == version.data.buildBuildVersion){
  //         console.log('当前已是最新版本。')
  //       }else{
  //         const _this = this
  //         Modal.alert(
  //           '有新版本，请安装更新后使用！',
  //           '版本:0.1.0' + '\n' +
  //           '新功能:' + '\n'+
  //           '1.', [
  //           { text: '安装', onPress: () => {
  //               Linking.openURL(`itms-services://?action=download-manifest&url=https%3A%2F%2Fwww.pgyer.com%2Fapiv2%2Fapp%2Fplist%3FappKey%3D${appKey}%26_api_key%3D${apiKey}`);
  //               AsyncStorage.setItem('buildVersion',JSON.stringify(version.data.buildBuildVersion))
  //             }
  //           },
  //         ]);
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // }
}
