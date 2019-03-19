import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ActionBarImage from '../view/header/ActionBarImage';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
		title: 'Home',
    headerRight: <ActionBarImage />,
   headerStyle: {
    backgroundColor: '#e3e3e3',
  },
  headerTintColor: '#606070',
	  };
	

  render() {

    return (
      <View>
      <Text onPress={()=> {this.props.navigation.navigate("SongList")}}>SongList</Text>
      </View>
    );
  }
}
