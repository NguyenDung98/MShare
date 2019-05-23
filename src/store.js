let state = {
	// data
	songsInStorage: [],
	albums: [],
	artists: [],
	downloads: [],
	uploads: [],
	currentPlaySong: null,
	currentPlaySongIndex: -1, // before shuffle
	selectedSong: null,
	// downloading
	downloadingSong: null,
	downloadProgress: 0,
	// uploading
	uploadingSong: null,
	uploadProgress: 0,
	// playList
	currentPlaylist: [],
	originalPlaylist: [],
	playlists: [],
	// device search
	deviceSearchedSongs: [],
	deviceSearchedAlbums: [],
	deviceSearchedArtists: [],
	deviceSearchedPlaylists: [],
	// online search
	searching: false,
	onlineSearchedSongs: [],
	onlineSearchedAlbums: [],
	onlineSearchedArtists: [],
	onlineSearchedPlaylists: [],
	// widget
	showStaticWidget: false,
	currentPlayState: null,
	repeatState: 0,
	shuffleState: false,
	//
	appState: null,
	atMainTab: false,
	// userInfo
	user: {},
	userFriends: [],
	sharing: false,
	sharingSongs: [],
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
	},
};
