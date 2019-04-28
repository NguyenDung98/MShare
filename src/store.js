let state = {
	songsInStorage: [],
	loadedSongs: [],
	albums: [],
	artists: [],
	currentPlaySong: null,
	currentPlaySongIndex: -1, // before shuffle
	// playList
	currentPlaylist: [],
	originalPlaylist: [],
	playlists: [],
	// search
	searchedSongs: [],
	searchedAlbums: [],
	searchedArtists: [],
	searchedPlaylists: [],
	// widget
	showStaticWidget: false,
	currentPlayState: null,
	repeatState: 0,
	shuffleState: false,
	//
	appState: null,
	// userInfo
	userFriends: [],
};

let listeners = [];

export default {
	getState() {
		return state;
	},
	setState(newState) {
		state = {...state, ...newState};
		listeners.forEach(listener => listener())
	},
	onChange(newListener) {
		listeners.push(newListener);
		return () => {
			listeners = listeners.filter(listener => listener !== newListener)
		}
	}
};
