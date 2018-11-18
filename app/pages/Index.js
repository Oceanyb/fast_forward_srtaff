import React from 'react'
import { View } from 'react-native'
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