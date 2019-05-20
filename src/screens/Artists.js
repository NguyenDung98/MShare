import React, {Component} from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import ArtistItem from "../components/Song";
import Entypo from 'react-native-vector-icons/Entypo';

import {ITEM_HEIGHT, SCREEN_HEIGHT, SONG_ITEM_WIDTH} from '../utils/';
import store from "../store";

const keyExtractor = (_, index) => index.toString();
const numOfFirstItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);

export default class Artists extends Component {
	static navigationOptions = {
		title: 'Ca sĩ'
	};

	endItems = numOfFirstItems;

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_getItemLayout = (data, index) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}
	};

	_loadMoreArtists = (data) => {
		if (this.endItems < data.length) {
			this.endItems =  this.endItems + numOfFirstItems;
			this.forceUpdate();
		}
	};

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
		const data = store.getState()[dataName];

		return (
			<FlatList
				keyExtractor={keyExtractor}
				data={data.slice(0, this.endItems)}
				onEndReached={() => this._loadMoreArtists(data)}
				getItemLayout={this._getItemLayout}
				renderItem={this._renderItem}
				showsVerticalScrollIndicator={false}
				initialNumToRender={numOfFirstItems}
			/>
		)
	}
}
