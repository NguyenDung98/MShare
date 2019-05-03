import {createMaterialTopTabNavigator} from 'react-navigation';
import SongList from "../screens/SongList";
import Albums from "../screens/Albums";
import Artists from "../screens/Artists";
import Playlists from "../screens/Playlists";
import {colors, SCREEN_WIDTH} from "../utils";

export const libraryTab = (songListData, albumsData, artistData, playlistsData) => {
	const TAB_BAR_PADDING = 25;

	return createMaterialTopTabNavigator({
			SongList: {
				screen: SongList,
				params: {dataName: songListData}
			},
			Albums: {
				screen: Albums,
				params: {dataName: albumsData}
			},
			Artists: {
				screen: Artists,
				params: {dataName: artistData}
			},
			Playlists: {
				screen: Playlists,
				params: {dataName: playlistsData}
			},
		},
		{
			tabBarPosition: 'top',
			swipeEnabled: true,
			animationEnabled: true,
			lazy: true,
			backBehavior: 'none',
			initialLayout: {
				height: 0,
				width: SCREEN_WIDTH,
			},
			tabBarOptions: {
				style: {
					borderBottomLeftRadius: 26,
					borderBottomRightRadius: 26,
					backgroundColor: colors.brightRed,
					paddingHorizontal: TAB_BAR_PADDING,
					elevation: 5,
				},
				indicatorStyle: {
					height: 0,
				},
				upperCaseLabel: false,
				scrollEnabled: true,
				labelStyle: {
					fontSize: 15,
				},
				tabStyle: {
					width: SCREEN_WIDTH / 3 - TAB_BAR_PADDING / 3,
				}
			},
		});
};
