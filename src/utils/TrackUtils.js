import store from "../store";
import TrackPlayer from "react-native-track-player";

export const skipToNext = async () => {
	const {currentPlaySongIndex, playList} = store.getState();
	if (currentPlaySongIndex !== -1) {
		const nextSongIndex = currentPlaySongIndex + 1 >= playList.length ?
			0 : currentPlaySongIndex + 1;

		await TrackPlayer.skip(playList[nextSongIndex].id);
	}
};

export const skipToPrevious = async () => {
	const {currentPlaySongIndex, playList} = store.getState();
	if (currentPlaySongIndex !== -1) {
		const prevSongIndex = currentPlaySongIndex - 1 < 0 ?
			playList.length - 1 : currentPlaySongIndex - 1;

		await TrackPlayer.skip(playList[prevSongIndex].id);
	}
};

export const togglePlay = async () => {
	const {currentPlayState} = store.getState();

	if (currentPlayState === TrackPlayer.STATE_PLAYING) {
		await TrackPlayer.pause();
	} else if (currentPlayState === TrackPlayer.STATE_PAUSED ||
		currentPlayState === TrackPlayer.STATE_NONE
	) {
		await TrackPlayer.play();
	}
};
