'use strict';

import { StyleSheet, StatusBar } from 'react-native'

// import deviceInfo from 'react-native-device-info';
let deviceInfo = {
  getModel() { }
}
console.log('statusBarH', StatusBar.currentHeight)

import defaultUi from './default'
import config from './config'

const c = {}
const c1 = {}
const c2 = {}
c.active = defaultUi.default
c.gray1 = defaultUi.gray1
c.gray2 = defaultUi.gray2
c.gray3 = defaultUi.gray3
c.gray4 = defaultUi.gray4
c.defaultText = defaultUi.defaultText
c.default = defaultUi.default
c.defaultBg = defaultUi.defaultBg
c.defaultBgLight = defaultUi.defaultBgLight
c.defaultBgActive = defaultUi.defaultBgActive
c1.red1 = '#ff9294'
c1.red2 = '#ffae6e'
c2.red1 = '#e60000'
c2.red2 = '#ff5700'
c1.pur1 = '#ff92ea'
c1.pur2 = '#e18fff'
c2.pur1 = '#f400b0'
c2.pur2 = '#9000d6'
c1.blue1 = '#9d96ff'
c1.blue2 = '#90e3ff'
c2.blue1 = '#5945e0'
c2.blue2 = '#3cb4f0'
c1.green1 = '#65ffd2'
c1.green2 = '#acff94'
c2.green1 = '#00cd75'
c2.green2 = '#80e100'
c1.yellow1 = '#fef949'
c1.yellow2 = '#ffcf62'
c2.yellow1 = '#ffea00'
c2.yellow2 = '#ff9a00'

let icons = {
  home: require('../icons/home.png'),
  home_fill: require('../icons/home_fill.png'),
  shop: require('../icons/shop.png'),
  shop_fill: require('../icons/shop_fill.png'),
  message: require('../icons/message.png'),
  message_fill: require('../icons/message_fill.png'),
  my: require('../icons/my.png'),
  my_fill: require('../icons/my_fill.png'),
}

let statusBarH = 0
let homeBarH = 0
if (deviceInfo.getModel() == 'iPhone X') {
  statusBarH = 44
  homeBarH = 34
} else {
  if (StatusBar.currentHeight) {
    statusBarH = StatusBar.currentHeight
  } else {
    statusBarH = 20
  }
}
let navH = 44
let tabBarH = 49 + homeBarH

export default {
  statusBarH,
  homeBarH,
  navH,
  tabBarH,
  c,
  c1,
  c2,
  tabBar: {
    unselectedTintColor: c.gray2,
    tintColor: c.active,
  },
  carousel: {
    style: {
      height: 180
    },
    autoplayTimeout: 5,
    autoplay: true,
    infinite: true,
    dotStyle: { backgroundColor: '#dedede', opacity: 0.7, marginBottom: -4 },
    dotActiveStyle: { backgroundColor: 'white', opacity: 1, marginBottom: -4 }
  },
  carouselRadio: {
    style: {
      height: 44
    },
    dots: false,
    autoplayTimeout: 5,
    autoplay: true,
    infinite: true,
    vertical: true
  },
  icons,
  grid: {
    itemStyle: { height: 64 }
  },
}
