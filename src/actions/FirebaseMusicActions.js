import firebase from 'react-native-firebase';
import store from "../store";
import _ from 'lodash';
import * as MediaLibrary from "expo-media-library";
import {getAudioMetaData} from "../utils";
import {addToDownloads} from "./SongActions";

export const searchMusicOnline = async (searchValue) => {
	const musicDatabaseRef = firebase.database().ref('/musics');
	const musicSearchRef = firebase.database().ref('/musicSearchData');

	if (searchValue) {
		const result = await Promise.all([
			musicDatabaseRef.orderByChild('title').startAt(searchValue).endAt(`${searchValue}\uf8ff`)
				.once('value'),
			musicSearchRef.child('albums').orderByChild('title').startAt(searchValue).endAt(`${searchValue}\uf8ff`)
				.once('value'),
			musicSearchRef.child('artists').orderByChild('name').startAt(searchValue).endAt(`${searchValue}\uf8ff`)
				.once('value')
		]);

		const [songs, albums, artists] = result;
		const songsWithId = _.map(songs.val(), (song, key) => ({
			...song,
			id: key,
		}));

		const searchedItems = {
			onlineSearchedSongs: songsWithId,
			onlineSearchedAlbums: albums.val() ? Object.values(albums.val()) : [],
			onlineSearchedArtists: artists.val() ? Object.values(artists.val()) : [],
			// onlineSearchedPlaylists: playlists.filter(playlist => playlist.title.toLocaleLowerCase().includes(searchValue)),
		};

		store.setState({...searchedItems});
	}
};

export const getSongsDetail = async (songsID) => {
	const musicDatabaseRef = firebase.database().ref('/musics');

	const songsData = await Promise.all(songsID.map(songID => {
		return musicDatabaseRef.child(songID).once('value')
	}));

	return songsData.map((song, index) => ({
		id: songsID[index],
		...song.val(),
	}));
};

export const filterPlayingSongType = async (songID) => {
	switch (songID) {
		case 'device':
			return 'Nghe nhạc trên thiết bị';
		case undefined:
		case 'inactive':
			return null;
		default:
			return (await getSongsDetail([songID]))[0];
	}
};

export const updateUserPublicInfo = (updateObject) => {
	if (firebase.auth().currentUser) {
		const {currentUser: {providerData: [{uid}]}} = firebase.auth();
		const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${uid}`);

		userPublicInfo.update({
			...updateObject,
		})
	}
};

export const updateSharingSongs = (isSeeking, currentPlaySong) => {
	if (!isSeeking && currentPlaySong.resource !== 'device') {
		const {sharingSongs} = store.getState();
		const newSharingSongs = Array.from(new Set([currentPlaySong.id, ...sharingSongs])).slice(0, 5);

		store.setState({
			sharingSongs: newSharingSongs,
		});
		updateUserPublicInfo({
			sharingSongs: newSharingSongs,
		})
	}
};

export const downloadSong = () => {
	const storageRef = firebase.storage().ref('/music');
	const {selectedSong, downloads} = store.getState();
	const uri = `${firebase.storage.Native.EXTERNAL_STORAGE_DIRECTORY_PATH}/MShare/${selectedSong.filename}`;
	const isDownloaded = downloads.some(song => selectedSong.filename === song.filename);

	if (!isDownloaded) {
		storageRef.child(selectedSong.filename)
			.downloadFile(uri)
			.on(firebase.storage.TaskEvent.STATE_CHANGED, async snapshot => {
				if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
					const asset = await MediaLibrary.createAssetAsync(uri);
					const song = await getAudioMetaData([asset]);

					addToDownloads(song[0])
				}
			})
	} else {
		alert('Đã tải r!!')
	}
};

// songsID.forEach(async (songID, index) => {
// 	const url = await musicStorageRef.child(songsData[index].val().filename).getDownloadURL();
// 	console.log(url);
// 	musicDatabaseRef.child(songID).update({url})
// });
