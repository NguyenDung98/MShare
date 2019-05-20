import React, {Component} from 'react';
import {Animated, Easing, FlatList, View, StatusBar} from 'react-native';

import Song from "../components/Song";
import CollectionDetailHeader from "../components/CollectionDetailHeader";
import CollectionDetailWidget from "../components/CollectionDetailWidget";
import SongOptionsModal from "../components/SongOptionsModal";

import {
	AVATAR_SIZE,
	colors,
	ITEM_HEIGHT,
	playSong, REPEAT_STATE,
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
	shuffle,
	SONG_ITEM_WIDTH
} from "../utils";
import store from "../store";
import * as Action from '../actions/'

const keyExtractor = (_, index) => index.toString();
const numOfFirstSongItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);

export default class CollectionDetail extends Component {
	static navigationOptions = {
		header: null,
		headerStyle: {
			height: 0,
			width: 0,
		}
	};

	state = {
		// data
		songs: [],
		originalSongs: [],
		isShuffled: false,
		repeatState: REPEAT_STATE.off,
		image: null,
		title: null,
		type: null,
		// animation
		animation: false,
		showModal: false,
	};

	titlePosition = new Animated.Value(0);
	endItems = numOfFirstSongItems;

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		});
	}

	componentWillMount() {
		const {navigation: {state: {params}}} = this.props;
		const {type, index, dataName} = params;

		if (type !== null && index !== null) {
			const {songs} = store.getState()[dataName][index];
			this._setUpSongsData(songs);

			if (type === 'Album') {
				const {artwork, artist, title} = store.getState()[dataName][index];
				this.setState({
					image: artwork,
					title,
					type,
				})
			} else if (type === 'Playlist') {
				const {title} = store.getState()[dataName][index];
				this.setState({
					title,
					type,
				})
			} else {
				const {avatar, name} = store.getState()[dataName][index];
				this.setState({
					image: avatar,
					title: name,
					type,
				})
			}
		}
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_setUpSongsData = (songs) => {
		if (typeof songs[0] !== 'object') {
			Action.getSongsDetail(songs).then(songs => {
				this.setState({songs})
			})
		} else {
			this.setState({songs})
		}
	};

	_onLayout = ({nativeEvent: {layout: {width}}}) => {
		if (width > SCREEN_WIDTH * 0.6 && !this.state.animation) {
			this.setState({
				animation: true,
			});
			Animated.loop(Animated.timing(this.titlePosition, {
				toValue: -SCREEN_WIDTH * 1.18,
				duration: 10000,
				easing: Easing.linear(),
				useNativeDriver: true,
			})).start()
		}
	};

	_changeWidth = () => {
		if (this.state.animation) {
			return {
				width: '120%',
			}
		}
	};

	_changeTitle = () => {
		const {title} = this.state;
		if (this.state.animation) {
			return title + "        " + title
		}

		return title;
	};

	_getItemLayout = (data, index) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}
	};

	_loadMoreSongs = (data) => {
		if (this.endItems < data.length) {
			this.endItems =  this.endItems + numOfFirstSongItems;
			this.forceUpdate();
		}
	};

	_selectSong = song => {
		Action.selectSong(song);
		this._toggleModal();
	};

	_toggleModal = () => {
		const {showModal} = this.state;

		this.setState({
			showModal: !showModal
		})
	};

	_shuffleSongs = () => {
		const {songs, isShuffled, originalSongs} = this.state;

		if (!isShuffled) {
			this.setState({
				isShuffled: true,
				songs: shuffle(songs),
				originalSongs: songs,
			})
		} else {
			this.setState({
				isShuffled: false,
				songs: originalSongs,
			})
		}
	};

	_changeRepeatState = () => {
		const {repeatState} = this.state;

		switch (repeatState) {
			case REPEAT_STATE.off:
				this.setState({repeatState: REPEAT_STATE.all});
				break;
			case REPEAT_STATE.all:
				this.setState({repeatState: REPEAT_STATE.one});
				break;
			case REPEAT_STATE.one:
				this.setState({repeatState: REPEAT_STATE.off});
				break;
		}
	};

	_playThisSongList = () => {
		const {repeatState, isShuffled, songs, originalSongs} = this.state;

		Action.setUpCurrentPlaylist({repeatState, isShuffled, songs, originalSongs});
		this.setState({
			repeatState: REPEAT_STATE.off,
			isShuffled: false,
			songs: originalSongs.length === 0 ? songs : originalSongs,
		})
	};

	_renderItem = ({item}) => {
		const {artwork, artist, title} = item;

		return (
			<Song
				uri={artwork}
				subTitle={artist}
				title={title}
				onPress={() => playSong(item)}
				onButtonPress={() => this._selectSong(item)}
			/>
		)
	};

	render() {
		const {navigation: {goBack}} = this.props;
		const {
			isShuffled,
			repeatState,
			songs,
			image,
			type,
			showModal,
		} = this.state;
		const {showStaticWidget} = store.getState();
		const songListStyle = {
			top: -AVATAR_SIZE * 0.4,
			height: showStaticWidget ?
				SCREEN_HEIGHT - SCREEN_HEIGHT * 0.3 - AVATAR_SIZE * 0.6 - SONG_ITEM_WIDTH :
				SCREEN_HEIGHT - SCREEN_HEIGHT * 0.3 - AVATAR_SIZE * 0.6,
		};

		return (
			<View>
				<StatusBar
					backgroundColor={colors.transparent}
					translucent
				/>
				<CollectionDetailHeader
					type={type}
					image={image}
					goBack={goBack}
					songs={songs.length}
					title={this._changeTitle()}
					onLayout={this._onLayout}
					customTitleStyle={{
						transform: [{translateX: this.titlePosition}],
						...this._changeWidth()
					}}
				/>
				<CollectionDetailWidget
					image={image}
					isShuffled={isShuffled}
					repeatState={repeatState}
					onPlaySongList={this._playThisSongList}
					onChangeRepeatState={this._changeRepeatState}
					onShuffle={this._shuffleSongs}
				/>
				<FlatList
					keyExtractor={keyExtractor}
					data={songs.slice(0, this.endItems)}
					onEndReached={() => this._loadMoreSongs(songs)}
					getItemLayout={this._getItemLayout}
					renderItem={this._renderItem}
					style={songListStyle}
					initialNumToRender={numOfFirstSongItems}
					showsVerticalScrollIndicator={false}
				/>
				<SongOptionsModal
					showModal={showModal}
					toggleModal={this._toggleModal}
				/>
			</View>
		);
	}
}
