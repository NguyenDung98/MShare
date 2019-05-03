import firebase from 'react-native-firebase';

export const uploadSongToFirebaseStorage = async (song) => {
	const {filename, uri, title, artwork, artist, albumName} = song;
	const uploadRef = firebase.storage().ref(`/music/${filename}`);

	uploadRef.putFile(uri)
		.then((snapshot) => {
			firebase.database().ref(`/musics/${snapshot.metadata.generation}`)
				.set({
					title,
					artwork,
					artist,
					albumName,
					filename,
				}, () => {
					console.log("Your're good to go!")
				})
		})
		.catch(e => {
			console.log(e);
		})
};

