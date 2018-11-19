'use strict';

import { StyleSheet, } from 'react-native'
import $xy from './xyui'

export default StyleSheet.create({
  itemImg: { width: 100, height: 80, borderRadius: 5 },
  itemImg2: { width: 100, height: 100, borderRadius: 5 },
  headImgRound1: { width: 72, height: 72, borderRadius: 36 },
  headImgRound2: { width: 52, height: 52, borderRadius: 26 },
  headImgRound3: { width: 36, height: 36, borderRadius: 18 },
  headImg1: { width: 72, height: 72, borderRadius: 5 },
  headImg2: { width: 52, height: 52, borderRadius: 5 },
  headImg3: { width: 36, height: 36, borderRadius: 5 },
  image: { height: '100%', width: '100%' },
  imageRadius: { height: '100%', width: '100%', borderRadius: 5 },
  banner1: { width: '100%', height: 240 },
  banner2: { width: '100%', height: 180 },
  banner3: { width: '100%', height: 120 },
  statusBarH: { height: $xy.statusBarH },
  navH: { height: $xy.navH + $xy.statusBarH },
  tabBarH: { height: $xy.tabBarH },
  xyTag: { borderRadius: 5, borderWidth: 1, fontSize: 12, height: 16, paddingLeft: 2, paddingRight: 2, paddingTop: 1 },
  title: { fontSize: 18, color: $xy.c.defaultText, fontWeight: 'bold' },
  text: { lineHeight: 26, fontSize: 16, color: $xy.c.gray1 },
  text2: { fontSize: 14, color: $xy.c.gray2 },
  text3: { fontSize: 12, color: $xy.c.gray3 }
})