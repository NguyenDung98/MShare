import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ImageBackground} from 'react-native';
import Avatar from "../components/Avatar";
import SongArtist from "../components/SongArtist";
import PlayingWidget from "../components/PlayingWidget";

import {colors} from "../utils";
import store from "../store";

const ARTWORK_SIZE = Dimensions.get('screen').height * 0.35;
const backgroundMain = require('./../imgs/background_song3.jpg')


export default class Playing extends Component {
	render() {
		const {currentPlaySong: {title, artist, artwork}} = store.getState();

		return (
			<ImageBackground source={backgroundMain} style={{ flex: 1, justifyContent  : 'center' }} resizeMode='cover'>
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
					wrapperStyle={styles.songArtist}
				/>
				<PlayingWidget/>
			</View>
			</ImageBackground>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: colors.white,
		...StyleSheet.absoluteFill,
	},
	nowPlaying: {
		flexGrow: 1,
		textAlignVertical: 'bottom',
		color: colors.grey,
		marginBottom: 20,
		letterSpacing: 3,
	},
	songArtist: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	},
});
