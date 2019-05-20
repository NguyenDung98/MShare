import AsyncStorage from "@react-native-community/async-storage";
import store from "../store";
import * as Action from "./index";

export const clearDataFromLocal = async () => {
	try {
		await AsyncStorage.removeItem('songs');
		store.setState({
			songsInStorage: [],
		});
	} catch (e) {
		console.log(e);
	}
};

export const setUpLocalData = async () => {
	try {
		const dataOnStorage = await AsyncStorage.multiGet(['songs', 'playlists', 'downloads']);

		store.setState({
			songsInStorage: dataOnStorage[0][1] ? JSON.parse(dataOnStorage[0][1]) : [],
			playlists: dataOnStorage[1][1] ? JSON.parse(dataOnStorage[1][1]) : [],
			downloads: dataOnStorage[2][1] ? JSON.parse(dataOnStorage[2][1]) : []
		});
		if (dataOnStorage[0][1]) {
			Action.setUpAlbumList();
			Action.setUpArtistList();
			return true;
		}

		return false;
	} catch (e) {
		console.log('error: ' + e)
	}
};

export const saveSongsToLocal = async () => {
	try {
		const {songsInStorage} = store.getState();

		if (songsInStorage.length > 20) {
			await AsyncStorage.setItem('songs', JSON.stringify(songsInStorage));
		}
	} catch (e) {
		console.log(e);
	}
};

export const saveDownloadsToLocal = async () => {
	try {
		const {downloads} = store.getState();

		await AsyncStorage.setItem('downloads', JSON.stringify(downloads));
	} catch (e) {
		console.log(e);
	}
};
