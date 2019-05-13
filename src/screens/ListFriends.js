import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'

import store from "../store";
import Friend from "../components/Song";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const keyExtractor = item => item.id;

export default class ListFriends extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item}) => {
		const {name, avatarUrl, online, stateTrack, playingSong} = item;
		const playingSongTitle = playingSong && typeof playingSong === "object" ? (
			<Text>
				<MaterialCommunityIcons
					name={'headphones'}
					size={15}
				/> {playingSong.title + ` - ${playingSong.artist}`}
			</Text>
		) : playingSong;

		return (
			<Friend
				showBadge
				showAlternativeIcon={false}
				uri={avatarUrl}
				title={name}
				subTitle={playingSongTitle}
				avatarIconWidth={50}
				imageStyle={{borderRadius: 25}}
			/>
		)
	};

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
