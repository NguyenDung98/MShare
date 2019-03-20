import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Avatar from "../components/Avatar";
import SongArtist from "../components/SongArtist";
import PlayingWidget from "../components/PlayingWidget";

import TrackPlayer from 'react-native-track-player';
import {colors} from "../utils";
import store from "../store";

const ARTWORK_SIZE = Dimensions.get('screen').height * 0.35;

export default class Playing extends Component {
	currentPlaySong = store.getState().songs[store.getState().currentPlayIndex];

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

		const song = this.currentPlaySong;
		let track = {
			...song,
			url: song.uri,
		};

		await TrackPlayer.add(track);
		await TrackPlayer.play();
	}

	render() {
		const {title, artist, artwork} = this.currentPlaySong;

		return (
			<View style={styles.container}>
				<Text style={styles.nowPlaying}>NOW PLAYING</Text>
				<Avatar
					uri={artwork}
					width={ARTWORK_SIZE}
					elevation={30}
				/>
				<SongArtist
					songTitle={title}
					artist={artist}
					songSize={25}
					artistSize={18}
					wrapperStyle={styles.songAuthor}
				/>
				<PlayingWidget/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
	},
	nowPlaying: {
		flexGrow: 1,
		textAlignVertical: 'bottom',
		color: colors.grey,
		marginBottom: 20,
		letterSpacing: 3,
	},
	songAuthor: {
		alignItems: 'center',
		marginTop: 20
	},
});
