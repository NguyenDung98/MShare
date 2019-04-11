import React, {Component} from 'react';
import {FlatList} from 'react-native';
import ArtistItem from "../components/Song";
import Entypo from 'react-native-vector-icons/Entypo';
import {SONG_ITEM_WIDTH} from '../utils/';
import store from "../store";

const keyExtractor = (_, index) => index.toString();

export default class Artists extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item}) => {
		const {avatar, name, songs} = item;

		return (
			<ArtistItem
				uri={avatar}
				songTitle={name}
				artist={songs.length + ' bài hát'}
				iconName={'modern-mic'}
				IconType={Entypo}
				imageStyle={{borderRadius: SONG_ITEM_WIDTH / 2}}
			/>
		)
	};

	render() {
		return (
			<FlatList
				data={store.getState().artists}
				keyExtractor={keyExtractor}
				renderItem={this._renderItem}
			/>
		)
	}
}
