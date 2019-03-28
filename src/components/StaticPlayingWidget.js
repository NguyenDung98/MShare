import React, {Component} from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from "react-native";
import Avatar from "./Avatar";
import SongArtist from "./SongArtist";
import Button from "./Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import PlayingWrapper from "../screens/PlayingWrapper";
import TrackPlayer from 'react-native-track-player';

import store from "../store";
import {skipToNext, skipToPrevious, SONG_ITEM_WIDTH, SONG_MARGIN} from "../utils";

class StaticPlayingWidget extends Component {
	state = {
		showPlayingWrapperScreen: false,
	};

	_onTogglePlay = async () => {
		const {currentPlayState} = store.getState();

		if (currentPlayState === TrackPlayer.STATE_PLAYING) {
			await TrackPlayer.pause();
		} else if (currentPlayState === TrackPlayer.STATE_PAUSED) {
			await TrackPlayer.play();
		}
	};

	_openPlayingWrapper = () => {
		this.setState({
			showPlayingWrapperScreen: true,
		})
	};

	_closePlayingWrapper = () => {
		this.setState({
			showPlayingWrapperScreen: false,
		})
	};

	render() {
		const {container, buttonStyle, songArtist} = styles;
		const {showPlayingWrapperScreen} = this.state;
		const {currentPlaySong: {artwork, artist, title}, currentPlayState} = store.getState();
		const isPlaying = currentPlayState === TrackPlayer.STATE_PLAYING;

		return (
			<TouchableNativeFeedback onPress={this._openPlayingWrapper}>
				<View style={container}>
					<Avatar
						uri={artwork}
						width={SONG_ITEM_WIDTH}
						imageStyle={{borderRadius: 0}}
					/>
					<SongArtist
						artist={artist}
						songTitle={title}
						wrapperStyle={songArtist}
						artistSize={12}
						songSize={15}
					/>
					<Button
						IconType={Ionicons}
						name={'ios-skip-backward'}
						style={buttonStyle(30)}
						iconSize={30}
						color={'black'}
						onPress={skipToPrevious}
					/>
					<Button
						IconType={Ionicons}
						name={isPlaying ? 'ios-pause' : 'ios-play'}
						style={buttonStyle(45)}
						iconSize={45}
						color={'black'}
						onPress={this._onTogglePlay}
					/>
					<Button
						IconType={Ionicons}
						name={'ios-skip-forward'}
						style={buttonStyle(30)}
						iconSize={30}
						color={'black'}
						onPress={skipToNext}
					/>
					<PlayingWrapper
						visible={showPlayingWrapperScreen}
						onRequestClose={this._closePlayingWrapper}
					/>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	songArtist: {
		flexGrow: 1,
		marginHorizontal: SONG_MARGIN,
		flexBasis: '40%',
	},
	buttonStyle: width => ({
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: SONG_MARGIN / 2,
		width
	}),
});

export default StaticPlayingWidget;
