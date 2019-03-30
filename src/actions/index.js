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

export const updateCurrentPlaySong = (item, index) => {
	store.setState({
		currentPlaySong: item,
		currentPlaySongIndex: index,
	});
};

export const addToPlayList = async (song, showWidget) => {
	const {playList, showStaticWidget} = store.getState();

	if (!playList.find(item => item.id === song.id)) {
		await TrackPlayer.add(song);
		store.setState({
			playList: [...playList, song],
			showStaticWidget: showWidget ? showWidget : showStaticWidget,
		});
	}
};

export const subscriptions = [
	TrackPlayer.addEventListener('playback-state', ({state}) => {
		store.setState({
			currentPlayState: state,
		});
	}),
	TrackPlayer.addEventListener('playback-track-changed', ({nextTrack}) => {
		const {playList} = store.getState();

		const currentPlaySongIndex = playList.findIndex(song => song.id === nextTrack);
		updateCurrentPlaySong(playList[currentPlaySongIndex], currentPlaySongIndex);
	})
];
