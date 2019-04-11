import store from "../store";
import TrackPlayer from "react-native-track-player";
import {repeatOrNext} from "../utils";
import _ from 'lodash';

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

	const albumListObject = songsInStorage.reduce((acc, song) => {
		if (song.albumName) {
			const albumName = song.albumName.trim();
			if (!acc.hasOwnProperty(albumName)) {
				acc[albumName] = {
					songs: [],
					artwork: null,
					artist: null,
					title: song.albumName ? song.albumName : 'Unknown',
				};
			}
			acc[albumName].songs.push(song);

			if (!acc[albumName].artwork && song.artwork) {
				acc[albumName].artwork = song.artwork;
			}

			if (!acc[albumName].artist && song.artist !== 'Unknown artist') {
				acc[albumName].artist = song.artist;
			}

			if (acc[albumName].artist && !acc[albumName].artist.includes(song.artist)) {
				acc[albumName].artist = acc[albumName].artist + ", " + song.artist;
			}
		}
		return acc;
	}, {});

	const albums = _.toArray(albumListObject);

	store.setState({albums})
};

export const setUpArtistList = () => {
	const {songsInStorage} = store.getState();

	const artistsObject = songsInStorage.reduce((acc, song) => {
		if (song.artist) {
			if (!acc.hasOwnProperty(song.artist)) {
				acc[song.artist] = {
					songs: [],
					name: song.artist,
					avatar: null,
				}
			}
			acc[song.artist].songs.push(song);

			if (!acc[song.artist].avatar && song.artwork) {
				acc[song.artist].avatar = song.artwork;
			}
		}

		return acc;
	}, {});

	const artists = _.toArray(artistsObject);

	store.setState({artists});
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
