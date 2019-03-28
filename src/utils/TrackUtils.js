import store from "../store";
import * as Action from "../actions";
import TrackPlayer from "react-native-track-player";

export const skipToNext = async () => {
	const {currentPlaySongIndex, playList} = store.getState();
	if (currentPlaySongIndex !== -1) {
		const nextSongIndex = currentPlaySongIndex + 1 >= playList.length ?
			0 : currentPlaySongIndex + 1;

		Action.updateCurrentPlaySong(playList[nextSongIndex], nextSongIndex);
		await TrackPlayer.skip(playList[nextSongIndex].id);
	}
};

export const skipToPrevious = async () => {
	const {currentPlaySongIndex, playList} = store.getState();
	if (currentPlaySongIndex !== -1) {
		const prevSongIndex = currentPlaySongIndex - 1 < 0 ?
			playList.length - 1 : currentPlaySongIndex - 1;

		Action.updateCurrentPlaySong(playList[prevSongIndex], prevSongIndex);
		await TrackPlayer.skip(playList[prevSongIndex].id);
	}
};

