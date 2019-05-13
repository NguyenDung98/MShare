import TrackPlayer from "react-native-track-player";
import store from "../store";
import {repeatOrNext} from "../utils";

export const subscriptions = [
	TrackPlayer.addEventListener('playback-state', ({state}) => {
		store.setState({
			currentPlayState: state,
		});
	}), // doi queue ended voi track changed neu can
	TrackPlayer.addEventListener('playback-queue-ended', async () => {
		const {currentPlaylist} = store.getState();

		if (currentPlaylist.length) {
			await TrackPlayer.skip(currentPlaylist[0].id);
		}
	}),
	TrackPlayer.addEventListener('playback-track-changed', async ({nextTrack, position}) => {
		const {appState, currentPlaySong} = store.getState();

		if (appState === 'background') {
			await repeatOrNext(position, currentPlaySong.duration);
		}
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
