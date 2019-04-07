import store from "../store";
import TrackPlayer from "react-native-track-player";
import {repeatOrNext} from "../utils";

export const addToSongList = songList => {
	const {songsInStorage} = store.getState();

	if (!songsInStorage.find(song => song.id === songList[0].id)) {
		store.setState({
			songsInStorage: [...songsInStorage, ...songList]
		});
		return true;
	}
	return false;
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

export const addToPlayList = async (song, showWidget) => {
	const {playList, showStaticWidget} = store.getState();

	if (!playList.find(item => item.id === song.id)) {
		await TrackPlayer.add(song);
		store.setState({
			playList: [...playList, song],
			showStaticWidget: showWidget ? showWidget : showStaticWidget,
		});
	}
};

export const setUpAlbumList = () => {
	const {songsInStorage} = store.getState();

	const albumList = songsInStorage.reduce((acc, song) => {
		if (song.albumName) {
			const albumName = song.albumName.trim();
			if (!acc.hasOwnProperty(albumName)) {
				acc[albumName] = [];
			}
			acc[albumName].push(song);
		}
		return acc;
	}, {});

	store.setState({albumList})
};

export const subscriptions = [
	TrackPlayer.addEventListener('playback-state', ({state}) => {
		store.setState({
			currentPlayState: state,
		});
	}),
	TrackPlayer.addEventListener('playback-queue-ended', async () => {
		const {playList} = store.getState();

		if (playList.length) {
			await TrackPlayer.skip(playList[0].id);
		}
	}),
	TrackPlayer.addEventListener('playback-track-changed', async ({nextTrack, position}) => {
		const {appState, playList, currentPlaySong} = store.getState();
		const currentPlaySongIndex = playList.findIndex(song => song.id === nextTrack);

		if (appState === 'background') {
			await repeatOrNext(position, currentPlaySong.duration);
		}
		updateCurrentPlaySong(playList[currentPlaySongIndex], currentPlaySongIndex);
	}),
];
