import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { getListFriend } from './ListFriendsAction';
import { LoginManager } from 'react-native-fbsdk';
import { clearAccessToken } from '../../utils/asyncStorage';

export default class ListFriends extends Component {
  render() {
    return (
      <View>
        <Button onPress={() => getListFriend()} title={'click and see console'} />
        <Button title='Logout' onPress={()=> {LoginManager.logOut(); clearAccessToken(); this.props.navigation.navigate('Login')}} />
      </View>
    )
  }
}
