import store from "../store";
import _ from 'lodash';

export const setUpArtistList = () => {
	const {songsInStorage} = store.getState();

	const artistsObject = songsInStorage.reduce((acc, song) => {
		if (song.artist) {
			const artistsArray = song.artist.split(',');

			artistsArray.forEach(artist => {
				const trimmedArtist = artist.trim();

				if (!acc.hasOwnProperty(trimmedArtist)) {
					acc[trimmedArtist] = {
						songs: [],
						name: trimmedArtist,
						avatar: null,
					}
				}
				acc[trimmedArtist].songs.push(song);

				if (!acc[trimmedArtist].avatar && song.artwork) {
					acc[trimmedArtist].avatar = song.artwork;
				}
			})
		}
		return acc;
	}, {});

	const artists = _.toArray(artistsObject);

	store.setState({artists});
};

