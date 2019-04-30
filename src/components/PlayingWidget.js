import React from 'react';
import { StyleSheet, View } from 'react-native';
import Progress from "./Progress";
import PlayingButtons from "./PlayingButtons";
import TrackPlayer from 'react-native-track-player';

import { REPEAT_STATE, shuffle, togglePlay } from "../utils";
import store from "../store";

export default class PlayingWidget extends React.Component {
	_onToggleRepeat = async () => {
		const { repeatState } = store.getState();

		switch (repeatState) {
			case REPEAT_STATE.off:
				store.setState({ repeatState: REPEAT_STATE.all });
				break;
			case REPEAT_STATE.all:
				store.setState({ repeatState: REPEAT_STATE.one });
				break;
			case REPEAT_STATE.one:
				store.setState({ repeatState: REPEAT_STATE.off });
				break;
		}
	};

	_onToggleShuffle = () => {
		const { shuffleState } = store.getState();

		store.setState({
			shuffleState: !shuffleState
		});
		this._shufflePlayList(!shuffleState);
	};

	_shufflePlayList = shuffleState => {
		const { currentPlaylist, originalPlaylist } = store.getState();

		if (shuffleState) {
			const shuffledPlayList = shuffle(currentPlaylist);
			store.setState({
				originalPlaylist: currentPlaylist,
				currentPlaylist: shuffledPlayList,
			})
		} else {
			store.setState({
				currentPlaylist: [...originalPlaylist, ...currentPlaylist.slice(originalPlaylist.length)],
			})
		}
		this._updateCurrentPlaySong();
	};

	_updateCurrentPlaySong = () => {
		const { currentPlaySong, currentPlaylist } = store.getState();
		const songIndex = currentPlaylist.findIndex(song => song.id === currentPlaySong.id);

		store.setState({ currentPlaySongIndex: songIndex });
	};

	render() {
		const { currentPlayState, shuffleState, repeatState } = store.getState();
		const isPlaying = currentPlayState === TrackPlayer.STATE_PLAYING ||
			currentPlayState === TrackPlayer.STATE_BUFFERING;

		return (
			<View style={styles.container}>
				<Progress />
				<PlayingButtons
					playing={isPlaying}
					onPlayTogglePress={togglePlay}
					onRepeatTogglePress={this._onToggleRepeat}
					repeatState={repeatState}
					onShuffleTogglePress={this._onToggleShuffle}
					shuffleState={shuffleState}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		padding: 25,
	}
});
