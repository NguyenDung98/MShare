import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, FlatList} from "react-native";
import Song from "../components/Song";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import {colors, SONG_ITEM_WIDTH, SONG_MARGIN} from "../utils";
import store from "../store";
import {getAudioMetaData} from "../utils/";

const keyExtractor = item => item.id;

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class SongList extends Component {
	loading = false;
	cursor = null;
	end = false;
	itemHeight = SONG_ITEM_WIDTH + SONG_MARGIN * 2;

	state = {
		songs: []
	};

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.setState({
				songs: store.getState().songs
			}, () => {
				this.loading = false;
			})
		});
		this._getAudios();
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
			first: 20,
			mediaType: "audio",
			sortBy: "id",
			after,
		});

		const {assets, endCursor, hasNextPage} = results;
		const songs = await getAudioMetaData(assets);

		store.setState({
			songs: [...store.getState().songs, ...songs]
		});

		this.cursor = hasNextPage ? endCursor : null;
		this.end = !hasNextPage;
	};

	_getItemLayout = (data, index) => {
		return {
			length: this.itemHeight,
			offset: this.itemHeight * index,
			index,
		}
	};

	_renderItem = ({item, index}) => {
		const {artwork, artist, title} = item;
		const {navigation: {navigate}} = this.props;

		return (
			<Song
				uri={artwork}
				artist={artist}
				songTitle={title}
				onPress={() => {
					store.setState({currentPlayIndex: index});
					navigate('Playing');
				}}
			/>
		)
	};

	render() {
		const initialNumToRender = Math.round(SCREEN_HEIGHT / this.itemHeight);

		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={keyExtractor}
					data={this.state.songs}
					renderItem={this._renderItem}
					onEndReached={() => this._getAudios(this.cursor)}
					getItemLayout={this._getItemLayout}
					removeClippedSubviews
					// showsVerticalScrollIndicator={false}
					initialNumToRender={initialNumToRender}
					// windowSize={11}
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
