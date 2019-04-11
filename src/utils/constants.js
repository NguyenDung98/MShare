import TrackPlayer from "react-native-track-player";
import {Dimensions} from "react-native";

export const SONG_ITEM_WIDTH = 65;
export const SONG_MARGIN = 10;
export const REPEAT_STATE = {
	off: 0,
	all: 1,
	one: 2,
};
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const ITEM_HEIGHT = SONG_ITEM_WIDTH + SONG_MARGIN * 2;
export const numOfFirstItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);

export const trackPlayerUpdateOptions = {
	stopWithApp: true,
	capabilities: [
		TrackPlayer.CAPABILITY_PLAY,
		TrackPlayer.CAPABILITY_PAUSE,
		TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
	],
	compactCapabilities: [
		TrackPlayer.CAPABILITY_PLAY,
		TrackPlayer.CAPABILITY_PAUSE
	],
	color: 0xB34286f4
};

