import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, FlatList} from "react-native";
import Song from "../components/Song";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import {colors, SONG_ITEM_WIDTH, SONG_MARGIN} from "../utils";
import store from "../store";
import * as Action from "../actions";
import {getAudioMetaData} from "../utils/";
import TrackPlayer from "react-native-track-player";

const keyExtractor = item => item.id;

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ITEM_HEIGHT = SONG_ITEM_WIDTH + SONG_MARGIN * 2;
const numOfFirstItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);

export default class SongList extends Component {
	loading = false;
	cursor = null;
	end = false;

	async componentDidMount() {
		await TrackPlayer.setupPlayer();
		TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			],
			compactCapabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE
			],
			color: '#FF9ACD32'
		});

		this._getAudios();
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
			this.loading = false;
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_getAudios = async (after) => {
		if (this.loading || this.end) return;

		const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (status !== 'granted') {
			console.log("Camera roll permissions denied");
			return;
		}

		this.loading = true;

		const results = await MediaLibrary.getAssetsAsync({
			first: numOfFirstItems,
			mediaType: "audio",
			sortBy: "id",
			after,
		});

		const {assets, endCursor, hasNextPage} = results;
		const songs = await getAudioMetaData(assets);

		this.cursor = hasNextPage ? endCursor : null;
		this.end = !hasNextPage;
		Action.addToSongList(songs);
	};

	_getItemLayout = (data, index) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}
	};

	_pressItem = async (item)=> {
		let track = {
			...item,
			url: item.uri,
		};
		Action.updateCurrentPlaySong(item);
		Action.updateStaticWidget(true);
		await Action.addToPlayList(track);
		await TrackPlayer.skip(track.id);
		await TrackPlayer.play();
	};

	_renderItem = ({item}) => {
		const {artwork, artist, title} = item;

		return (
			<Song
				uri={artwork}
				artist={artist}
				songTitle={title}
				onPress={() => this._pressItem(item)}
			/>
		)
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={keyExtractor}
					data={store.getState().songs}
					renderItem={this._renderItem}
					onEndReached={() => this._getAudios(this.cursor)}
					getItemLayout={this._getItemLayout}
					removeClippedSubviews
					showsVerticalScrollIndicator={false}
					initialNumToRender={numOfFirstItems}
					windowSize={11}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
});
