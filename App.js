import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/storage';
import { Platform, InteractionManager } from 'react-native';

import AppNavigator from "./src/navigation/AppNavigator"

export default class App extends Component {

	render() {
		return <AppNavigator />
	}
}
