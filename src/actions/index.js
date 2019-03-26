import TrackPlayer from "react-native-track-player";
import store from "../store";
const MODE = {
	UPDATE: 1,
	ADD: 2,
	REMOVE: 3,
};

const updateState = (payload, stateName, mode) => {
	const state = store.getState();

	switch (mode) {
		case MODE.UPDATE:
			store.setState({
				[stateName]: payload
			});
			break;
		case MODE.ADD:
			if (Array.isArray(payload)) {
				store.setState({
					[stateName]: [...state[stateName], ...payload]
				});
			} else {
				store.setState({
					[stateName]: [...state[stateName], payload]
				});
			}
			break;
		case MODE.REMOVE:
			store.setState({
				[stateName]: state[stateName].filter(item => item !== payload)
			});
			break;
		default:

	}
};

export const addToSongList = songList => {
	const songs = store.getState().songs;
	if (!songs.find(song => song.id === songList[0].id)) {
		updateState(songList, 'songs', MODE.ADD);
	}
};

export const updateCurrentPlaySong = song => {
	updateState(song, 'currentPlaySong', MODE.UPDATE)
};

export const addToPlayList = async (song) => {
	const playList = store.getState().playList;
	if (!playList.find(item => item.id === song.id)) {
		await TrackPlayer.add(song);
		updateState(song, 'playList', MODE.ADD);
	}
};

export const updateStaticWidget = state => {
	updateState(state, 'showStaticWidget', MODE.UPDATE);
};
