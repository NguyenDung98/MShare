import React from 'react';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import SongList from '../screens/SongList';
import TabHeader from '../components/TabHeader';
import Albums from "../screens/Albums";
import Artists from "../screens/Artists";
import CollectionDetail from "../screens/CollectionDetail";
import SearchHeader from "../components/SearchHeader";
import HomeScreen from "../screens/HomeScreen";
import Playlists from "../screens/Playlists";
import ListFriends from '../screens/ListFriends';
import OtherScreen from '../screens/OtherScreen';

import { colors } from "../utils/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {Platform, Dimensions, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsFeed from '../screens/Newsfeed';
import IconButton from "../components/IconButton";
import {ICON_COLOR} from "../constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { height } = Dimensions.get('window');



const TabScreen = (songListData, albumsData, artistData, playlistsData) => {
	const TAB_BAR_PADDING = 25;

	return createMaterialTopTabNavigator({
		SongList: {
			screen: SongList,
			params: { dataName: songListData }
		},
		Albums: {
			screen: Albums,
			params: { dataName: albumsData }
		},
		Artists: {
			screen: Artists,
			params: { dataName: artistData }
		},
		Playlists: {
			screen: Playlists,
			params: { dataName: playlistsData }
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

const MainTabNavigator = createMaterialTopTabNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			tabBarLable: 'Home',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home'} style={{ color: tintColor }} />
			)
		}
	},
	Newsfeed: {
		screen: NewsFeed,
		navigationOptions: {
			tabBarLable: 'News feed',
			tabBarIcon: ({ tintColor = '', focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-paper' : 'ios-paper-outline') : 'md-paper'} style={{ color: tintColor }} />
			)
		}
	},
	// Musics: {
	// 	screen: TabScreen('searchedSongs', 'searchedAlbums',
	// 	'searchedArtists', 'searchedPlaylists'),
	// 	navigationOptions: {
	// 		tabBarLable : 'Musics',
	// 		tabBarIcon: ({ tintColor, focused }) => (
	// 			<Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-musical-notes' : 'ios-musical-notes-outline') : 'md-musical-note' } style={{ color: tintColor }} />
	// 		  )
	// 	}
	// },
	Friends: {
		screen: ListFriends,
		navigationOptions: {
			tabBarLable: 'Friends',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-people' : 'ios-people-outline') : 'md-people'} style={{ color: tintColor }} />
			)
		}
	},
	Other: {
		screen: OtherScreen,
		navigationOptions: {
			tabBarLable: 'Other',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-apps' : 'ios-apps-outline') : 'md-apps'} style={{ color: tintColor }} />
			)
		}
	},
},
	{
		initialRouteName: 'Home',
		tabBarPosition : 'bottom',
		swipeEnabled: true,
		animationEnabled: true,
		// lazy: true,
		tabBarOptions: {
			showIcon: true,
			style : {
				backgroundColor : colors.brightRed,
				height: height / 14 + 5,
			},
			labelStyle: {
				fontSize: 12,
				marginTop : 0,
			  },
			  upperCaseLabel: false

		},
		
	}
)

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
		navigationOptions: ({navigation: {navigate}}) => ({
			headerLeft: (
				<IconButton
					name={'account-circle'}
					iconSize={40}
					style={{
						marginLeft: 10,
						width: 40,
						height: 40,
						borderRadius: 40 / 2,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					color={ICON_COLOR}
					IconType={MaterialIcons}
					ButtonType={TouchableNativeFeedback}
					buttonProps={{
						background: TouchableNativeFeedback.Ripple(colors.lightGrey, true)
					}}
					onPress={() => navigate('Profile')}
				/>
			),
			
		})
	},
	SongsTabScreen: {
		screen: TabScreen('loadedSongs', 'albums', 'artists', 'playlists'),
		navigationOptions: ({ navigation }) => ({
			header: <TabHeader navigation={navigation} />,
		}),
	},
	SearchTabScreen: {
		screen: TabScreen('searchedSongs', 'searchedAlbums',
			'searchedArtists', 'searchedPlaylists'),
		navigationOptions: ({ navigation }) => ({
			header: <SearchHeader navigation={navigation} />,
		}),
	},
	CollectionDetail,
	Profile: ProfileScreen,
}, {
		headerMode: 'float',
});

export default createAppContainer(HomeStack);

