import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SongList from './SongList';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View>
      <Text onPress={()=> {this.props.navigation.navigate("SongList")}}>SongList</Text>
        
      </View>
    );
  }
}
