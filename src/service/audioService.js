import TrackPlayer from 'react-native-track-player';
import * as Action from '../actions';
import store from "../store";

module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause',  () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-next', async () => {
	    const {currentPlaySongIndex, playList} = store.getState();
	    const nextSongIndex = currentPlaySongIndex + 1 === playList.length ?
		    0 : currentPlaySongIndex + 1;

	    Action.updateCurrentPlaySong(playList[nextSongIndex], nextSongIndex);
	    await TrackPlayer.skip(playList[nextSongIndex].id);
    });
};
