import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import homeStack from './homeStack';
import LoginScreen from "../screens/LoginScreen";

export default createAppContainer(createSwitchNavigator({
	// You could add another route here for authentication.
	// Read more at https://reactnavigation.org/docs/en/auth-flow.html
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Welcome',
			header: null
		}
	},
	Main: homeStack,
}));
