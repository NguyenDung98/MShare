import store from "../store";
import _ from 'lodash';

export const setUpAlbumList = () => {
	const {songsInStorage} = store.getState();

	const albumListObject = songsInStorage.reduce((acc, song) => {
		if (song.albumName) {
			const albumName = song.albumName.trim();
			if (!acc.hasOwnProperty(albumName)) {
				acc[albumName] = {
					songs: [],
					artwork: null,
					artist: null,
					title: albumName ? albumName : 'Unknown',
				};
			}
			acc[albumName].songs.push(song);

			if (!acc[albumName].artwork && song.artwork) {
				acc[albumName].artwork = song.artwork;
			}

			if (!acc[albumName].artist && song.artist !== 'Unknown artist') {
				acc[albumName].artist = song.artist;
			}

			if (acc[albumName].artist && !acc[albumName].artist.includes(song.artist)) {
				acc[albumName].artist = acc[albumName].artist + ", " + song.artist;
			}
		}
		return acc;
	}, {});

	const albums = Object.values(albumListObject);

	store.setState({albums})
};
