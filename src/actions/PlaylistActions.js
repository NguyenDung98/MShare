import AsyncStorage from '@react-native-community/async-storage';
import store from "../store";

export const createNewPlaylist = async (playlistTitle) => {
	try {
		const {playlists} = store.getState();
		const playlist = {
			title: playlistTitle,
			songs: [],
		};
		const newPlaylists = [
			playlist,
			...playlists,
		];

		if (validatePlaylistTitle(playlist.title, playlists)) {
			store.setState({
				playlists: newPlaylists,
			});
			await AsyncStorage.setItem('playlists', JSON.stringify(newPlaylists));
		}
	} catch (e) {
		console.log('error: ' + e)
	}
};

export const deletePlaylist = async (playlistIndex) => {
	try {
		const {playlists} = store.getState();

		playlists.splice(playlistIndex, 1);

		store.setState({playlists});
		await AsyncStorage.setItem('playlists', JSON.stringify(playlists));
	} catch (e) {
		console.log(e);
	}
};

export const updatePlaylist = async (newData, playlistIndex) => {
	try {
		const {playlists} = store.getState();

		const updatePlaylist = {
			...playlists[playlistIndex],
			...newData,
		};

		playlists.splice(playlistIndex, 1, updatePlaylist);

		store.setState({playlists});
		await AsyncStorage.setItem('playlists', JSON.stringify(playlists));
	} catch (e) {
		console.log(e);
	}
};

export const addToPlaylist = async (song, playlistIndex) => {
	try {
		const {playlists} = store.getState();
		const chosenPlaylist = playlists[playlistIndex - 1];

		if (!chosenPlaylist.songs.find(item => item.id === song.id)) {
			const updatingPlaylist = {
				...chosenPlaylist,
				songs: [
					song,
					...chosenPlaylist.songs,
				]
			};

			playlists.splice(playlistIndex - 1, 1, updatingPlaylist);

			store.setState({
				playlists,
			});
			await AsyncStorage.setItem('playlists', JSON.stringify(playlists));
		}
	} catch (e) {
		console.log(e);
	}
};

const validatePlaylistTitle = (title, playlists) => {
	if (playlists.length) {
		const playlistsTitle = playlists.map(playlist => playlist.title);

		return title.trim() && playlistsTitle.indexOf(title) === -1;
	}

	return title.trim();
};
