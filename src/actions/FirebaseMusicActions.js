import firebase from 'react-native-firebase';
import store from "../store";
import * as Action from "./StorageActions";

export const searchMusicOnline = async (searchValue) => {
	const { registerGetOnlineData } = store.getState();

	if (!registerGetOnlineData) {
		await registerGetOnlineDataFromFirebase()
	}

	const { onlineSearchData } = store.getState();
	if (searchValue && onlineSearchData) {
		const { songs, albums, artists } = onlineSearchData;

		const searchedItems = {
			onlineSearchedSongs: await getSongsDetail(
				songs.filter(song => song[0].toLowerCase().includes(searchValue)).map(song => song[1])
			),
			onlineSearchedAlbums: albums.filter(album => album.title.toLowerCase().includes(searchValue)),
			onlineSearchedArtists: artists.filter(artist => artist.name.toLocaleLowerCase().includes(searchValue)),
			// onlineSearchedPlaylists: playlists.filter(playlist => playlist.title.toLocaleLowerCase().includes(searchValue)),
		};

		store.setState({ ...searchedItems });
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
		const { currentUser: { providerData: [{ uid }] } } = firebase.auth();
		const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${uid}`);

		userPublicInfo.update({
			...updateObject,
		})
	}
};

export const updateSharingSongs = (isSeeking, currentPlaySong) => {
	if (!isSeeking && currentPlaySong.resource !== 'device') {
		const { sharingSongs } = store.getState();
		const newSharingSongs = Array.from(new Set([currentPlaySong.id, ...sharingSongs].slice(0, 5)));

		store.setState({
			sharingSongs: newSharingSongs,
		});
		updateUserPublicInfo({
			sharingSongs: newSharingSongs,
		})
	}
};

// export var getSharingMusic = (userId) => {
// 	var data = [];
// 	const userInfo = firebase.database().ref(`/usersPublicInfo/${userId}`).child('/sharingSongs')
// 		.on('value', snapshot => {
// 			var list = [];
// 			list = snapshot.val();
// 			data = snapshot.val()
// 			console.log(data)
// 		})
// 		console.log(data)
// 		return data;
// }
