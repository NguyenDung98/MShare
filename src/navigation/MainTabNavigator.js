import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import Playing from './../screens/Playing';
import SongList from '../screens/SongList';
import PlayingOnline from '../screens/PlayingOnline';
import HeaderWithHomeAndSearch, { renderHeaderWithSearch } from '../view/header/HeaderWithHomeAndSearch';
import { SCALE_RATIO } from '../constants/constants';
import {HEADER_COLOR} from './../constants/constants'
import Login from '../screens/LoginScreen';

const TabScreen = createMaterialTopTabNavigator({
    SongList: SongList,
    Online: PlayingOnline,
},
{
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        style: {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: HEADER_COLOR,
        },
        indicatorStyle: {
            borderBottomColor: '#EEE6FF',
            borderBottomWidth: 5 * SCALE_RATIO,
        },
    }
}) 


const HomeStack = createStackNavigator({
    Login: Login,
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            header : renderHeaderWithSearch(),
        },
    },
    Playing: Playing,

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


