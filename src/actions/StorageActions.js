import AsyncStorage from "@react-native-community/async-storage";
import store from "../store";
import * as Action from "./index";
import {numOfFirstItems} from "../utils";

export const clearData = async () => {
	try {
		await AsyncStorage.removeItem('songs');
		store.setState({
			songsInStorage: [],
			loadedSongs: [],
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
			Action.addToDisplaySongList(numOfFirstItems);
			Action.setUpAlbumList();
			Action.setUpArtistList();
		}
	} catch (e) {
		console.log('error: ' + e)
	}
};

export const saveData = async () => {
	try {
		const {songsInStorage} = store.getState();

		await AsyncStorage.setItem('songs', JSON.stringify(songsInStorage));
	} catch (e) {
		console.log(e);
	}
};