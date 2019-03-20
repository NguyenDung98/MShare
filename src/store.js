let state = {
	songs: [],
	currentPlaySong: -1,
	playList: [],
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
