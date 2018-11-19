'use strict';

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, } from 'react-native'

import XyHeaderItem from '../parts/XyHeaderItem'

import $xy from '../styles/xyui'
import $css from '../styles/css'

// [{
//   key: '1',
//   headerTitle: '',
//   headerRight: '',
//   style: {},
//   children: </>,
// }]
export default (callback) => {
  return ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => { callback ? callback(item) : '' }} >
        <View style={[{ backgroundColor: '#fff', marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 8, borderRadius: 5 }, item.style]} >
          <XyHeaderItem headerTitle={item.headerTitle} headerRight={item.headerRight} padd >
            {item.children}
          </XyHeaderItem>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const _ = StyleSheet.create({
})