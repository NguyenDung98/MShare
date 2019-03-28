import TrackPlayer from 'react-native-track-player';
import {skipToNext} from '../utils';

module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause',  () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-next', skipToNext);
};
