import TrackPlayer from "react-native-track-player";
import store from "../store";
import {REPEAT_STATE, repeatOrNext} from "../utils";
import {updateUserPublicInfo} from "./FirebaseMusicActions";

export const subscriptions = [
	TrackPlayer.addEventListener('playback-state', async ({state}) => {
		const {currentPlayState} = store.getState();

		if (currentPlayState !== state && state !== TrackPlayer.STATE_STOPPED) {
			store.setState({
				currentPlayState: state,
			});
		}
	}), // doi queue ended voi track changed neu can
	TrackPlayer.addEventListener('playback-queue-ended', async () => {
		const {currentPlaylist, repeatState} = store.getState();

		if (currentPlaylist.length > 1) {
			await TrackPlayer.skip(currentPlaylist[0].id);
		} else {
			if (REPEAT_STATE.off === repeatState) {
				await TrackPlayer.seekTo(0);
				await TrackPlayer.stop();
				updateUserPublicInfo({
					playingSong: 'inactive'
				})
			} else {
				await TrackPlayer.skip(currentPlaylist[0].id);
			}
		}
	}),
	TrackPlayer.addEventListener('playback-track-changed', async ({nextTrack, position}) => {
		const {appState, currentPlaySong} = store.getState();

		if (appState === 'background') {
			await TrackPlayer.pause();
			await repeatOrNext(position, currentPlaySong.duration);
			await TrackPlayer.play();
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
