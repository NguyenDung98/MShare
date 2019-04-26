import store from "../store";
import _ from 'lodash';

export const setUpArtistList = () => {
	const {songsInStorage} = store.getState();

	const artistsObject = songsInStorage.reduce((acc, song) => {
		if (song.artist) {
			if (!acc.hasOwnProperty(song.artist)) {
				acc[song.artist] = {
					songs: [],
					name: song.artist,
					avatar: null,
				}
			}
			acc[song.artist].songs.push(song);

			if (!acc[song.artist].avatar && song.artwork) {
				acc[song.artist].avatar = song.artwork;
			}
		}

		return acc;
	}, {});

	const artists = _.toArray(artistsObject);

	store.setState({artists});
};

