import React, {Component} from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from "react-native";
import Avatar from "./Avatar";
import SongArtist from "./SongArtist";
import Button from "./Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrackPlayer from 'react-native-track-player';
import store from "../store";

import {SONG_ITEM_WIDTH, SONG_MARGIN} from "../utils";
import NavigationService from "../service/NavigationService";
import * as Action from "../actions";

class StaticPlayingWidget extends Component {
	state = {
		currentPlayState: null
	};

	componentDidMount() {
		this.subscriptions = [
			TrackPlayer.addEventListener('playback-state', ({state}) => {
				this.setState({currentPlayState: state});
			}),
		];
		this.unsubcribte = store.onChange(() => {
			this.forceUpdate()
		});
	}

	componentWillUnmount() {
		this.subscriptions.forEach(subscription => subscription.remove());
		this.unsubcribte();
	}

	_onTogglePlay = async () => {
		const {currentPlayState} = this.state;

		if (currentPlayState === TrackPlayer.STATE_PLAYING) {
			await TrackPlayer.pause();
		} else if (currentPlayState === TrackPlayer.STATE_PAUSED) {
			await TrackPlayer.play();
		}
	};

	_navigatePlayingWrapper = () => {
		Action.updateStaticWidget(false);
		NavigationService.navigate('PlayingWrapper')
	};

	render() {
		const {container, buttonStyle, songArtist} = styles;
		const isPlaying = this.state.currentPlayState === TrackPlayer.STATE_PLAYING;
		const {artwork, artist, title} = store.getState().currentPlaySong;

		return (
			<TouchableNativeFeedback onPress={this._navigatePlayingWrapper}>
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
