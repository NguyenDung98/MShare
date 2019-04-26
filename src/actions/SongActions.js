import store from "../store";
import TrackPlayer from "react-native-track-player";

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

export const addToDisplaySongList = numberOfSongs => {
	const {songsInStorage, loadedSongs} = store.getState();
	const currentSongIndex = loadedSongs.length;
	const nextSongs = songsInStorage.slice(currentSongIndex, currentSongIndex + numberOfSongs);

	store.setState({
		loadedSongs: [...loadedSongs, ...nextSongs]
	})
};

export const updateCurrentPlaySong = (item, index) => {
	store.setState({
		currentPlaySong: item,
		currentPlaySongIndex: index,
	});
};

export const addToPlayingList = async (song, showWidget) => {
	const {currentPlaylist, showStaticWidget, currentPlaySong} = store.getState();
	let track = {
		...song,
		url: song.uri,
	};

	if (!currentPlaylist.find(item => item.id === track.id)) {
		await TrackPlayer.add(track);
		store.setState({
			currentPlaylist: [...currentPlaylist, track],
			showStaticWidget: showWidget ? showWidget : showStaticWidget,
			currentPlaySong: currentPlaySong ? currentPlaySong : track,
		});
	}
};
