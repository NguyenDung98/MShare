import React, { Component } from 'react'
import { Text, View, Button , FlatList} from 'react-native'
import { getListFriend } from '../actions/ListFriendsAction';
import { LoginManager } from 'react-native-fbsdk';
import { clearAccessToken } from '../utils/asyncStorage';
import { getUserFriends } from '../actions/FacebookAuthActions'
import store from '../store'
import { userFriends } from '../data/Friend';
import { ItemFriend } from '../components/FriendItem';


const keyExtractor = item => item.id;

export default class ListFriends extends Component {
	componentWillMount() {
		getUserFriends();
	}
	_renderItem =  ({item}) => (
		<ItemFriend
			item = {item}
		/>
	)
	render() {
		return (
			<View>
				<FlatList
					extraData={userFriends.friends.data}
					data={userFriends.friends.data}
					renderItem={this._renderItem}
					keyExtractor={keyExtractor}
				/>
			</View>
		)
	}
}
