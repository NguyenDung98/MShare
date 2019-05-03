import TrackPlayer from "react-native-track-player";
import store from "../store";
import {repeatOrNext} from "../utils";
import {updateCurrentPlaySong} from "./index";

export const subscriptions = [
	TrackPlayer.addEventListener('playback-state', ({state}) => {
		store.setState({
			currentPlayState: state,
		});
	}),
	TrackPlayer.addEventListener('playback-queue-ended', async () => {
		const {currentPlaylist} = store.getState();

		if (currentPlaylist.length) {
			await TrackPlayer.skip(currentPlaylist[0].id);
		}
	}),
	TrackPlayer.addEventListener('playback-track-changed', async ({nextTrack, position}) => {
		const {appState, currentPlaylist, currentPlaySong} = store.getState();
		const currentPlaySongIndex = currentPlaylist.findIndex(song => song.id === nextTrack);

		if (appState === 'background') {
			await repeatOrNext(position, currentPlaySong.duration);
		}
		updateCurrentPlaySong(currentPlaylist[currentPlaySongIndex], currentPlaySongIndex);
	}),
];

export const navigationEventSubscriptions = (navigation) => {
	const parent = navigation.dangerouslyGetParent();

	return [
		parent.addListener('willFocus', onFocusMainTab),
		parent.addListener('willBlur', onBlurMainTab)
	]
};

const onBlurMainTab = () => {
	store.setState({
		atMainTab: false,
	})
};

const onFocusMainTab = () => {
	store.setState({
		atMainTab: true,
	})
};
