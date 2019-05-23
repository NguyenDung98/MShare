import firebase from "react-native-firebase";
import store from "../store";
import {ToastAndroid} from "react-native";

export const uploadSong = () => {
	const musicDatabaseRef = firebase.database().ref('/musics');
	const {selectedSong} = store.getState();

	musicDatabaseRef.orderByChild('title').startAt(selectedSong.title).endAt(`${selectedSong.title}\uf8ff`)
		.once('value', snapshot => {
			const songs = snapshot.val();
			if (songs) {
				const foundSong = Object.values(songs).some(song => song.artist === selectedSong.artist &&
					song.albumName === selectedSong.albumName);
				if (!foundSong) {
					uploadSongToFirebase(selectedSong);
				}
			} else {
				uploadSongToFirebase(selectedSong);
			}
		})
};

const uploadSongToFirebase = async (song) => {
	const {filename, uri, title, artwork, artist, albumName, duration} = song;
	const storageRef = firebase.storage().ref(`/music/${filename}`);
	const musicDatabaseRef = firebase.database().ref('/musics');

	storageRef.putFile(uri)
		.then(async (snapshot) => {
			const url = await storageRef.getDownloadURL();
			musicDatabaseRef.child(snapshot.metadata.generation)
				.set({
					title,
					artwork,
					artist,
					albumName,
					filename,
					duration,
					url,
				}, async () => {
					await updateSearchData(song, snapshot.metadata.generation);
					ToastAndroid.showWithGravityAndOffset(
						`Upload bài hát "${song.title}" thành công`,
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM,
						15,
						50,
					);
				})
		})
		.catch(e => {
			console.log(e);
		})
};

const updateSearchData = async (song, newID) => {
	const {artwork, artist, albumName} = song;
	const musicSearchDataRef = firebase.database().ref('/musicSearchData');

	const artistArr = artist.split(',').map(artist => artist.trim());
	const albumFirebase = albumName ?
		await musicSearchDataRef.child('albums')
			.orderByChild('title').startAt(albumName).endAt(`${albumName}\uf8ff`)
			.limitToFirst(1)
			.once('value') : null;

	const artistFirebase = await Promise.all([
		...artistArr.map(artist => musicSearchDataRef.child('artists')
			.orderByChild('name').startAt(artist).endAt(`${artist}\uf8ff`)
			.limitToFirst(1)
			.once('value')
		),
	]);

	// album
	if (albumFirebase) {
		const foundAlbum = albumFirebase.val();
		if (foundAlbum) {
			Object.keys(foundAlbum).forEach(key => {
				musicSearchDataRef.child(`/albums${key}/songs`)
					.once('value', snapshot => {
						musicSearchDataRef.child(`/albums/${key}`)
							.update({
								songs: [newID, ...snapshot.val()]
							})
					})
			})
		} else {
			musicSearchDataRef.child('/albums')
				.push({
					artist,
					artwork,
					songs: [newID],
					title: albumName,
				})
		}
	}
	// artist
	const artistArrFirebase = artistFirebase.map(artist => artist.val());
	artistArrFirebase.forEach((artist, index) => {
		let firstArtist = artist;
		if (Array.isArray(artist)) {
			const artistIndex = artist.findIndex(val => val !== null);
			firstArtist = {
				[artistIndex]: artist[artistIndex]
			};
		}

		if (firstArtist) {
			Object.keys(firstArtist).forEach(key => {
				musicSearchDataRef.child(`/artists/${key}/songs`)
					.once('value', snapshot => {
						musicSearchDataRef.child(`/artists/${key}`)
							.update({
								songs: [newID, ...snapshot.val()]
							})
					})
			})
		} else {
			musicSearchDataRef.child('/artists')
				.push({
					avatar: artwork,
					songs: [newID],
					name: artistArr[index],
				})
		}
	})
};
