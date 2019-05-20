import store from "../store";
import TrackPlayer from "react-native-track-player";
import {playSong, skipToNext} from "../utils";
import {updateUserPublicInfo} from "./FirebaseMusicActions";

export const setUpCurrentPlaylist = async ({repeatState, isShuffled, songs, originalSongs}) => {
	await TrackPlayer.reset();
	songs.forEach(async song => {
		await TrackPlayer.add(song);
	});

	store.setState({
		repeatState,
		shuffleState: isShuffled,
		currentPlaylist: songs,
		originalPlaylist: originalSongs,
	});
	playSong(songs[0]);
	store.setState({
		showStaticWidget: true,
	})
};

export const addToCurrentPlayList = async (song, showWidget, filtered) => {
	const {currentPlaylist, showStaticWidget, currentPlaySong, currentPlaySongIndex} = store.getState();

	if (filtered || !currentPlaylist.find(item => item.id === song.id)) {
		if (!currentPlaySong) await TrackPlayer.reset();
		await TrackPlayer.add(song);
		store.setState({
			currentPlaylist: [...currentPlaylist, song],
			showStaticWidget: showWidget ? showWidget : showStaticWidget,
			currentPlaySong: currentPlaySong ? currentPlaySong : song,
			currentPlaySongIndex: currentPlaySongIndex !== -1 ? currentPlaySongIndex : 0,
		});
	}
};

export const removeFromCurrentPlaylist = async songIndex => {
	const {currentPlaylist, currentPlaySongIndex} = store.getState();

	if (songIndex > currentPlaySongIndex) {
		store.setState({
			currentPlaylist: currentPlaylist.filter((_, index) => index !== songIndex),
		})
	} else if (songIndex < currentPlaySongIndex) {
		store.setState({
			currentPlaylist: currentPlaylist.filter((_, index) => index !== songIndex),
			currentPlaySongIndex: currentPlaySongIndex - 1,
		});
	} else {
		if (currentPlaylist.length > 1) {
			store.setState({
				currentPlaylist: currentPlaylist.filter((_, index) => index !== songIndex),
				currentPlaySongIndex: currentPlaySongIndex - 1 >= 0 ?
					currentPlaySongIndex - 1 : currentPlaySongIndex,
			});
			await skipToNext();
		} else {
			await TrackPlayer.stop();
			store.setState({
				currentPlaylist: [],
				currentPlaySongIndex: -1,
				currentPlaySong: null,
				showStaticWidget: false,
			});
			updateUserPublicInfo({
				playingSong: 'inactive'
			})
		}
	}
};

