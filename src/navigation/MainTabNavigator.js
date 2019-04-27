import React from 'react';
import {createStackNavigator, createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';

import SongList from '../screens/SongList';
import PlayingOnline from '../screens/PlayingOnline';
import TabHeader from '../components/TabHeader';
import Albums from "../screens/Albums";
import Artists from "../screens/Artists";
import CollectionDetail from "../screens/CollectionDetail";
import SearchHeader from "../components/SearchHeader";
import HomeScreen from "../screens/HomeScreen";
import Playlists from "../screens/Playlists";

import {colors} from "../utils/colors";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const TabScreen = (songListData, albumsData, artistData, playlistsData) => {
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

const HomeStack = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Welcome',
			header: null
		}
	},
	HomeScreen,
	SongsTabScreen: {
		screen: TabScreen('loadedSongs', 'albums', 'artists', 'playlists'),
		navigationOptions: ({navigation}) => ({
			header: <TabHeader navigation={navigation}/>,
		}),
	},
	SearchTabScreen: {
		screen: TabScreen('searchedSongs', 'searchedAlbums',
			'searchedArtists', 'searchedPlaylists'),
		navigationOptions: ({navigation}) => ({
			header: <SearchHeader navigation={navigation}/>,
		}),
	},
	CollectionDetail,
	Profile : ProfileScreen,
}, {
	headerMode: 'float',
});

export default createAppContainer(HomeStack);

// HomeStack.navigationOptions = {
//     tabBarLabel: 'Home',
//     tabBarIcon: ({ focused }) => (
//         // <TabBarIcon
//         //     focused={focused}
//         //     name={
//         //         Platform.OS === 'ios'
//         //             ? `ios-information-circle${focused ? '' : '-outline'}`
//         //             : 'md-information-circle'
//         //     }
//         // />
//     ),
// };

// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };


