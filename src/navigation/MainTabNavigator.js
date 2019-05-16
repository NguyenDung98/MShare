import React from 'react';
import {Platform, Dimensions, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import ListFriends from '../screens/ListFriends';
import OtherScreen from '../screens/OtherScreen';
import NewsFeed from '../screens/Newsfeed';

import { colors, SCREEN_HEIGHT } from "../utils";
import IconButton from "../components/IconButton";
import {ICON_COLOR} from "../constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import store from "../store";

export const MainTabNavigator = createMaterialTopTabNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home'} style={{ color: tintColor }} />
			)
		}
	},
	Newsfeed: {
		screen: NewsFeed,
		navigationOptions: {
			tabBarLabel: 'News feed',
			tabBarIcon: ({ tintColor = '', focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-paper' : 'ios-paper-outline') : 'md-paper'} style={{ color: tintColor }} />
			)
		}
	},
	// Musics: {
	// 	screen: TabScreen('deviceSearchedSongs', 'deviceSearchedAlbums',
	// 	'deviceSearchedArtists', 'deviceSearchedPlaylists'),
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
			tabBarLabel: 'Friends',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-people' : 'ios-people-outline') : 'md-people'} style={{ color: tintColor }} />
			)
		}
	},
	Other: {
		screen: OtherScreen,
		navigationOptions: {
			tabBarLabel: 'Other',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon size={24} name={Platform.OS === 'ios' ? (focused ? 'ios-apps' : 'ios-apps-outline') : 'md-apps'} style={{ color: tintColor }} />
			)
		}
	},
},
	{
		initialRouteName: 'Home',
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		animationEnabled: true,
		lazy: true,
		tabBarOptions: {
			showIcon: true,
			style: {
				backgroundColor: colors.brightRed,
				height: SCREEN_HEIGHT / 14 + 5,
			},
			labelStyle: {
				fontSize: 12,
				marginTop: 0,
			},
			upperCaseLabel: false
		},
	}
);

export const navigationOptions = ({navigation: {navigate}}) =>  ({
	title: 'MShare',
	headerLeft: (
		<IconButton
			name={'account-circle'}
			iconSize={40}
			style={styles.leftHeaderBtnStyle(40)}
			color={ICON_COLOR}
			IconType={MaterialIcons}
			ButtonType={TouchableNativeFeedback}
			buttonProps={{
				background: TouchableNativeFeedback.Ripple(colors.lightGrey, true)
			}}
			onPress={() => moveToProfile(navigate)}
		/>
	),
	headerRight: (
		<IconButton
			name={'search1'}
			IconType={AntDesign}
			iconSize={40 * 0.7}
			style={styles.searchBtnStyle(40)}
			color={ICON_COLOR}
			ButtonType={TouchableNativeFeedback}
			buttonProps={{
				background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
			}}
			onPress={() => navigate('OnlineSearchTabScreen')}
		/>
	),
	headerStyle: {
		backgroundColor: colors.brightRed,
	},
	headerTintColor: '#fff',
});

const moveToProfile = (navigate) => {
	const {user: {id}} = store.getState();

	navigate('Profile', {
		userID: id,
		type: 'user',
	})
};

const styles = StyleSheet.create({
	leftHeaderBtnStyle: (buttonSize) => ({
		marginLeft: 10,
		width: buttonSize,
		height: buttonSize,
		borderRadius: buttonSize / 2,
		alignItems: 'center',
		justifyContent: 'center',
	}),
	searchBtnStyle: (buttonSize) => ({
		marginRight: 10,
		width: buttonSize * 0.7,
		height: buttonSize * 0.7,
		borderRadius: buttonSize / 2,
		alignItems: 'center',
		justifyContent: 'center',
	}),
});
