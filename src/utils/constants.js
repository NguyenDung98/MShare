import TrackPlayer from "react-native-track-player";
import {Dimensions} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import store from "../store";

export const SONG_ITEM_WIDTH = 65;
export const SONG_MARGIN = 10;
export const ITEM_HEIGHT = SONG_ITEM_WIDTH + SONG_MARGIN * 2;
export const REPEAT_STATE = {
	off: 0,
	all: 1,
	one: 2,
};
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const numOfFirstItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);
// collection detail
export const AVATAR_SIZE = 120;
export const WIDGET_BUTTON_SIZE = 35;
export const AVATAR_MARGIN_LEFT = 15;
// track player
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
// section list item
export const deviceSection = () => {
	const {songsInStorage, artists, albums, playlists} = store.getState();

	return [
		{
			avatarIconName: 'library-music',
			iconType: MaterialIcons,
			title: 'Bài hát',
			subTitle: songsInStorage.length.toString(),
			targetScreen: 'SongList',
		},
		{
			avatarIconName: 'queue-music',
			iconType: MaterialIcons,
			title: 'Playlist',
			subTitle: playlists.length.toString(),
			targetScreen: 'Playlists',
		},
		{
			avatarIconName: 'disc',
			iconType: Feather,
			title: 'Albums',
			subTitle: albums.length.toString(),
			targetScreen: 'Albums',
		},
		{
			avatarIconName: 'modern-mic',
			iconType: Entypo,
			title: 'Ca sĩ',
			subTitle: artists.length.toString(),
			targetScreen: 'Artists',
		},
	];
};
