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
		const dataOnStorage = await AsyncStorage.multiGet(['songs', 'playlists']);

		store.setState({
			songsInStorage: dataOnStorage[0][1] ? JSON.parse(dataOnStorage[0][1]) : [],
			playlists: dataOnStorage[1][1] ? JSON.parse(dataOnStorage[1][1]) : [],
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

export const saveDataToLocal = async () => {
	try {
		const {songsInStorage} = store.getState();

		await AsyncStorage.setItem('songs', JSON.stringify(songsInStorage));
	} catch (e) {
		console.log(e);
	}
};
