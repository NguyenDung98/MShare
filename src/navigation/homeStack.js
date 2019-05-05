import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LibraryTabHeader from "../components/LibraryTabHeader";
import SearchHeader from "../components/SearchHeader";
import CollectionDetail from "../screens/CollectionDetail";

import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";

import {libraryTab} from "./libraryTab";
import {MainTabNavigator, navigationOptions} from "./MainTabNavigator";

const HomeStack = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Welcome',
			header: null
		}
	},
	MainTabNavigator: {
		screen: MainTabNavigator,
		navigationOptions,
	},
	SongsTabScreen: {
		screen: libraryTab('songsInStorage', 'albums', 'artists', 'playlists'),
		navigationOptions: ({navigation}) => ({
			header: <LibraryTabHeader navigation={navigation}/>,
		}),
	},
	DeviceSearchTabScreen: {
		screen: libraryTab('deviceSearchedSongs', 'deviceSearchedAlbums',
			'deviceSearchedArtists', 'deviceSearchedPlaylists'),
		navigationOptions: ({navigation}) => ({
			header: (
				<SearchHeader
					navigation={navigation}
					online={false}
				/>
			),
		}),
	},
	OnlineSearchTabScreen: {
		screen: libraryTab('onlineSearchedSongs', 'onlineSearchedAlbums',
			'onlineSearchedArtists', 'onlineSearchedPlaylists'),
		navigationOptions: ({navigation}) => ({
			header: (
				<SearchHeader
					navigation={navigation}
					online={true}
				/>
			),
		}),
	},
	CollectionDetail,
	Profile: ProfileScreen,
}, {
	headerMode: 'float',
});

export default createAppContainer(HomeStack);
