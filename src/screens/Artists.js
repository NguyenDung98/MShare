import React, {Component} from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import ArtistItem from "../components/Song";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";

import {SONG_ITEM_WIDTH} from '../utils/';
import store from "../store";

const keyExtractor = (_, index) => index.toString();

export default class Artists extends Component {
	static navigationOptions = {
		title: 'Ca sĩ'
	};

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item, index}) => {
		const {avatar, name, songs} = item;
		const {navigation: {navigate, getParam}} = this.props;

		return (
			<ArtistItem
				uri={avatar}
				title={name}
				subTitle={songs.length + ' bài hát'}
				avatarIconName={'modern-mic'}
				avatarIconType={Entypo}
				avatarIconWidth={50}
				buttonType={TouchableWithoutFeedback}
				buttonIconName={'chevron-small-right'}
				buttonIconType={Entypo}
				imageStyle={{borderRadius: SONG_ITEM_WIDTH / 2, width: 65}}
				onPress={() => navigate('CollectionDetail', {
					type: 'Ca sĩ',
					index,
					dataName: getParam('dataName'),
				})}
				onButtonPress={() => navigate('CollectionDetail', {
					type: 'Ca sĩ',
					index,
					dataName: getParam('dataName'),
				})}
			/>
		)
	};

	render() {
		const {navigation: {getParam}} = this.props;
		const dataName = getParam('dataName');

		return (
			<FlatList
				data={store.getState()[dataName]}
				keyExtractor={keyExtractor}
				renderItem={this._renderItem}
			/>
		)
	}
}
