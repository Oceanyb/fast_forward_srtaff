import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Home extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      ...props,
    }
  }

  render() {
    return(
      <View>
        <Text>Hello Home!</Text>
      </View>
    )
  }
}