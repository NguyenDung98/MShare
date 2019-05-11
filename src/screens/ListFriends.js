import React, { Component } from 'react'
import { View, FlatList} from 'react-native'
import { ItemFriend } from '../components/FriendItem';

import store from "../store";

const keyExtractor = item => item.id;

export default class ListFriends extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem =  ({item}) => (
		<ItemFriend
			item = {item}
		/>
	);

	render() {
		const data = Object.values(store.getState().userFriends);

		return (
			<View>
				<FlatList
					data={data}
					renderItem={this._renderItem}
					keyExtractor={keyExtractor}
				/>
			</View>
		)
	}
}
