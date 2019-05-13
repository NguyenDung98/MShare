import store from "../store";
import TrackPlayer from "react-native-track-player";
import * as firebaseMusicAction from "./FirebaseMusicActions";

export const addToSongList = songList => {
	const {songsInStorage} = store.getState();

	for (let newSong of songList) {
		if (songsInStorage.find(song => song.id === newSong.id)) {
			return false;
		}
	}

	store.setState({
		songsInStorage: [...songsInStorage, ...songList]
	});
	return true;
};

export const updateCurrentPlaySong = (item, index) => {
	if (item.resource !== 'device') {
		firebaseMusicAction.updateUserPublicInfo( {
			playingSong: item.id
		});
	} else {
		firebaseMusicAction.updateUserPublicInfo({
			playingSong: 'device'
		})
	}

	store.setState({
		currentPlaySong: item,
		currentPlaySongIndex: index,
	});
};

export const addToCurrentPlayList = async (song, showWidget, filtered) => {
	const {currentPlaylist, showStaticWidget, currentPlaySong} = store.getState();
	let track = {
		...song,
		url: song.uri,
	};

	if (filtered || !currentPlaylist.find(item => item.id === track.id)) {
		await TrackPlayer.add(track);
		store.setState({
			currentPlaylist: [...currentPlaylist, track],
			showStaticWidget: showWidget ? showWidget : showStaticWidget,
			currentPlaySong: currentPlaySong ? currentPlaySong : track,
		});
	}
};
