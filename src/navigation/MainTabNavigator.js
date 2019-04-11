import React from 'react';
import {createStackNavigator, createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';

import SongList from '../screens/SongList';
import PlayingOnline from '../screens/PlayingOnline';
import TabHeader from '../components/TabHeader';
import {HEADER_COLOR} from './../constants/constants'
import SearchResult from "../screens/SearchResult";
import Albums from "../screens/Albums";
import Artists from "../screens/Artists";

const TabScreen = createMaterialTopTabNavigator({
		SongList,
		Albums,
		Artists,
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
				backgroundColor: HEADER_COLOR,
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
	TabScreen: {
		screen: TabScreen,
		navigationOptions: {
			header: <TabHeader/>,
		},
	},
	SearchResult,
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


