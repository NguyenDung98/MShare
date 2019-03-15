import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PlayList from './PlayList';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View>
      <Text>abc</Text>
        <PlayList />
      </View>
    );
  }
}
