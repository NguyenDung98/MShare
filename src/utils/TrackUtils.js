import store from "../store";
import TrackPlayer from "react-native-track-player";
import {REPEAT_STATE} from "./constants";
import * as Action from "../actions";

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

export const repeatOrNext = async (value, duration) => {
	const {repeatState, currentPlaySongIndex, playList, currentPlaySong} = store.getState();

	if (duration !== 0 && Math.ceil(value) >= Math.floor(duration)) {
		switch (repeatState) {
			case REPEAT_STATE.one:
				await TrackPlayer.skip(currentPlaySong.id);
				break;
			case REPEAT_STATE.all:
				await skipToNext();
				break;
			case REPEAT_STATE.off:
				await skipToNext();
				if (currentPlaySongIndex === playList.length - 1) {
					await TrackPlayer.stop();
				}
		}
		return true;
	}

	return false;
};

export const playSong = async (item) => {
	const {playList} = store.getState();
	let track = {
		...item,
		url: item.uri,
	};

	Action.updateCurrentPlaySong(item, playList.length);
	await Action.addToPlayList(track, true);
	await TrackPlayer.skip(track.id);
	await TrackPlayer.play();
};
