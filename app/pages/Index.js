'use strict';

import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Blank from './Blank'
import TabNav from './TabNav'
import Login from './Login'
import SearchDeviceInfo from './SearchDeviceInfo'

import GoodList from './GoodList'
import GoodDetail from './GoodDetail'

import Account from './Account'
import RechargeRecord from './RechargeRecord'
import BillDetail from './BillDetail'

import ShopInfo from './ShopInfo'
import UserInfo from './UserInfo'
import Help from './Help'

const Index = createAppContainer(
  createStackNavigator({
    TabNav: {
      screen: TabNav,
      navigationOptions:() => ({
        header: null,
      })
    },
    GoodList: {
      screen: GoodList
    },
    Login: {
      screen: Login
    },
    GoodDetail: {
      screen: GoodDetail
    },
    ShopInfo: {
      screen: ShopInfo
    },
    UserInfo: {
      screen: UserInfo
    },
    Help: {
      screen: Help
    },
    Blank: {
      screen: Blank
    },
    Account: {
      screen: Account
    },
    RechargeRecord: {
      screen: RechargeRecord
    },
    BillDetail: {
      screen: BillDetail
    },
    SearchDeviceInfo: {
      screen: SearchDeviceInfo
    },
  },{
    initialRouteName: 'Blank',
    headerMode: 'screen'
  })
)

export default Index