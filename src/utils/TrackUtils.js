import store from "../store";
import TrackPlayer from "react-native-track-player";
import {REPEAT_STATE} from "./constants";
import * as Action from "../actions";

export const skipToNext = async () => {
	const {currentPlaySongIndex, currentPlaylist} = store.getState();
	if (currentPlaySongIndex !== -1) {
		const nextSongIndex = currentPlaySongIndex + 1 >= currentPlaylist.length ?
			0 : currentPlaySongIndex + 1;

		await TrackPlayer.skip(currentPlaylist[nextSongIndex].id);
		Action.updateCurrentPlaySong(currentPlaylist[nextSongIndex], nextSongIndex);
	}
};

export const skipToPrevious = async () => {
	const {currentPlaySongIndex, currentPlaylist} = store.getState();
	if (currentPlaySongIndex !== -1) {
		const prevSongIndex = currentPlaySongIndex - 1 < 0 ?
			currentPlaylist.length - 1 : currentPlaySongIndex - 1;

		await TrackPlayer.skip(currentPlaylist[prevSongIndex].id);
		Action.updateCurrentPlaySong(currentPlaylist[prevSongIndex], prevSongIndex);
	}
};

export const togglePlay = async () => {
	const {currentPlayState, currentPlaySong, currentPlaySongIndex} = store.getState();

	if (currentPlayState === TrackPlayer.STATE_PLAYING) {
		await TrackPlayer.pause();
	} else if (currentPlayState === TrackPlayer.STATE_PAUSED ||
		currentPlayState === TrackPlayer.STATE_NONE
	) {
		await TrackPlayer.play();
		Action.updateCurrentPlaySong(currentPlaySong, currentPlaySongIndex)
	}
};

export const repeatOrNext = async (value, duration, isSeeking) => {
	const {repeatState, currentPlaySongIndex, currentPlaylist, currentPlaySong} = store.getState();

	if (duration !== 0 && Math.ceil(value) >= Math.floor(duration)) {
		Action.updateSharingSongs(isSeeking, currentPlaySong);
		switch (repeatState) {
			case REPEAT_STATE.one:
				await TrackPlayer.skip(currentPlaySong.id);
				break;
			case REPEAT_STATE.all:
				await skipToNext();
				break;
			case REPEAT_STATE.off:
				await skipToNext();
				if (currentPlaySongIndex === currentPlaylist.length - 1) {
					await TrackPlayer.stop();
					Action.updateUserPublicInfo({
						playingSong: 'inactive'
					})
				}
		}
		return true;
	}

	return false;
};


export const playSong = async (item) => {
	const {currentPlaylist} = store.getState();
	const songIndex = currentPlaylist.findIndex(song => song.id === item.id);

	if (songIndex === -1) {
		Action.updateCurrentPlaySong(item, currentPlaylist.length);
		await Action.addToCurrentPlayList(item, true, true);
	} else {
		Action.updateCurrentPlaySong(item, songIndex);
	}

	await TrackPlayer.skip(item.id);
	await TrackPlayer.play();
};
