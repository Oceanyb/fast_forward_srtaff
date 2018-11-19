'use strict';

import React from 'react'
import { Text, View, TextInput, Image } from 'react-native'

import $xy from '../styles/xyui'
import $css from '../styles/css'

export default class XySearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props, }

  }
  // <XySearchBar style={{}} inputStyle={{}} props={{}} inputProps={{}} autoFocus placeholder='' />
  render() {
    let data = this.state
    return (
      <View style={[{ backgroundColor: data.bgc || '#ffffff35', padding: 6, borderRadius: 5, flexDirection: 'row' }, data.style]} {...data.props} >
        <Image style={{ width: 16, height: 16, position: 'absolute', margin: 6 }} source={require('../icons/search.png')} ></Image>
        <TextInput autoFocus={data.autoFocus || false} placeholder={data.placeholder || ''} {...data.inputProps} style={[{ flex: 1, backgroundColor: 'transparent', color: '#fff', marginLeft: 20 }, data.inputStyle]} ></TextInput>
      </View>
    )
  }
}
