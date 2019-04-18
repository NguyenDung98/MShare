import React from 'react';
import {createStackNavigator, createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';

import SongList from '../screens/SongList';
import PlayingOnline from '../screens/PlayingOnline';
import TabHeader from '../components/TabHeader';
import {HEADER_COLOR} from './../constants/constants'
import Albums from "../screens/Albums";
import Artists from "../screens/Artists";
import CollectionDetail from "../screens/CollectionDetail";
import {colors} from "../utils/colors";
import SearchHeader from "../components/SearchHeader";

const TabScreen = (songListData, albumsData, artistData) => createMaterialTopTabNavigator({
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
		// Online: PlayingOnline,
	},
	{
		tabBarPosition: 'top',
		swipeEnabled: true,
		animationEnabled: true,
		lazy: true,
		tabBarOptions: {
			style: {
				borderBottomLeftRadius: 26,
				borderBottomRightRadius: 26,
				backgroundColor: colors.brightRed,
				paddingHorizontal: 25,
				elevation: 5,
			},
			indicatorStyle: {
				height: 0,
			},
			upperCaseLabel: false,
			labelStyle: {
				fontSize: 15,
			}
		},
	});

const HomeStack = createStackNavigator({
	SongsTabScreen: {
		screen: TabScreen('loadedSongs', 'albums', 'artists'),
		navigationOptions: {
			header: <TabHeader/>,
		},
	},
	SearchTabScreen: {
		screen: TabScreen('searchedSongs', 'searchedAlbums', 'searchedArtists'),
		navigationOptions: ({navigation}) => ({
			header: <SearchHeader navigation={navigation}/>,
		}),
	},
	CollectionDetail,
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


