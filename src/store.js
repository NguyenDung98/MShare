let state = {
	songs: [],
	currentPlaySong: null,
	currentPlaySongIndex: -1,
	playList: [],
	originalPlayList: [],
	// widget
	showStaticWidget: false,
	currentPlayState: null,
	repeatState: 0,
	shuffleState: false,
	//
	appState: null,
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
