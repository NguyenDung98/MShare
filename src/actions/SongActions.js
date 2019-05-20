import store from "../store";
import * as firebaseMusicAction from "./FirebaseMusicActions";
import {saveDownloadsToLocal} from "./StorageActions";
import {setUpArtistList} from "./AritstActions";
import {setUpAlbumList} from "./AlbumActions";

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

export const addToDownloads = song => {
	const {downloads} = store.getState();

	store.setState({
		downloads: [song, ...downloads]
	});
	saveDownloadsToLocal();
	updateToLibrary(song);
};

export const updateToLibrary = song => {
	const {songsInStorage} = store.getState();

	store.setState({
		songsInStorage: [song, ...songsInStorage]
	});
	setUpArtistList();
	setUpAlbumList();
};

export const updateCurrentPlaySong = (song, index) => {
	if (song.resource !== 'device') {
		firebaseMusicAction.updateUserPublicInfo( {
			playingSong: song.id
		});
	} else {
		firebaseMusicAction.updateUserPublicInfo({
			playingSong: 'device'
		})
	}

	store.setState({
		currentPlaySong: song,
		currentPlaySongIndex: index,
	});
};

export const selectSong = (song) => {
	store.setState({
		selectedSong: song,
	})
};
