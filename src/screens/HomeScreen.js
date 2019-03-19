import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SCALE_RATIO } from '../constants/constants';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View style={styles.container}>
      <Text>Thư viện</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    height: 100 * SCALE_RATIO,
    // weight : 100 * SCALE_RATIO,
    paddingTop: 0,
    backgroundColor: '#000000',

  }
});