import store from "../store";
import TrackPlayer from "react-native-track-player";

export const addToSongList = songList => {
	const {songs} = store.getState();

	if (!songs.find(song => song.id === songList[0].id)) {
		store.setState({
			songs: [...songs, ...songList]
		});
	}
};

export const updateCurrentPlaySong = (item, index, widgetState) => {
	const {showStaticWidget} = store.getState();

	store.setState({
		currentPlaySong: item,
		currentPlaySongIndex: index,
		showStaticWidget: widgetState ? widgetState : showStaticWidget,
	})
};

export const addToPlayList = async (song) => {
	const {playList} = store.getState();

	if (!playList.find(item => item.id === song.id)) {
		await TrackPlayer.add(song);
		store.setState({
			playList: [...playList, song]
		});
	}
};

export const subscriptions = [
	TrackPlayer.addEventListener('playback-state', ({state}) => {
		store.setState({
			currentPlayState: state,
		})
	}),
	TrackPlayer.addEventListener('playback-queue-ended', async () => { // repeat functionality
		const {playList: [firstSong]} = store.getState();

		if (firstSong) {
			await TrackPlayer.skip(firstSong.id);
		}
	})
];
