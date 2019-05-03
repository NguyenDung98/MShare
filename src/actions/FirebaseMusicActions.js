import firebase from 'react-native-firebase';
import store from "../store";

export const searchMusicOnline = async (searchValue) => {
	const {registerGetOnlineData} = store.getState();

	if (!registerGetOnlineData) {
		await registerGetOnlineDataFromFirebase()
	}

	const {onlineSearchData} = store.getState();
	if (searchValue && onlineSearchData) {
		const {songs, albums, artists} = onlineSearchData;

		const searchedItems = {
			onlineSearchedSongs: await getSongsDetail(songs.filter(song => song[0].toLowerCase().includes(searchValue))),
			onlineSearchedAlbums: albums.filter(album => album.title.toLowerCase().includes(searchValue)),
			onlineSearchedArtists: artists.filter(artist => artist.name.toLocaleLowerCase().includes(searchValue)),
			// onlineSearchedPlaylists: playlists.filter(playlist => playlist.title.toLocaleLowerCase().includes(searchValue)),
		};

		store.setState({...searchedItems})
	}
};

const getSongsDetail = async (songs) => {
	const songsID = songs.map(song => song[1]);
	const musicDatabaseRef = firebase.database().ref('/musics');
	const musicStorageRef = firebase.storage().ref('/music');

	const songsData = await Promise.all(songsID.map(songID => {
		return musicDatabaseRef.child(songID).once('value')
	}));
	const songsWithUrl = await Promise.all(songsData.map(song => {
		return musicStorageRef.child(song.val().filename).getDownloadURL();
	}));

	return songsData.map((song, index) => ({
		id: songsID[index],
		uri: songsWithUrl[index],
		...song.val(),
	}));
};

const registerGetOnlineDataFromFirebase = () => {
	return new Promise(resolve => {
		firebase.database().ref('/musicSearchData')
			.on('value', snapshot => {
				store.setState({
					registerGetOnlineData: true,
					onlineSearchData: snapshot.val(),
				});
				resolve('success')
			})
	})
};
