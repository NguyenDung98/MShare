import React, { Component } from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import { Button } from 'native-base';

import firebase from 'react-native-firebase';

import { SCALE_RATIO } from '../constants/constants';
import * as Action from "../actions";
import * as facebookAction from "../actions/FacebookAuthActions";

const logo = require('./../imgs/logoMshare.png')
const background = require('./../imgs/background.jpg')

export default class Login extends Component {
	componentWillMount() {
		const { navigation: { navigate } } = this.props;
		let firstCall = true;

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				navigate('MainTabNavigator');
				if (!firstCall) {
					facebookAction.getUserFriends();
					Action.saveUserToStore(user);
					Action.subscribeUserConnection();
				}
			}
			firstCall = false;
		});
	};

	componentDidMount() {
		const {navigation} = this.props;

		this.navigationEventSubcriptions = Action.loginScreenNavigationEventSubscriptions(navigation);
	}

	componentWillUnmount() {
		this.navigationEventSubcriptions.forEach(event => event.remove())
	}

	_login = async () => {
		const { navigation: { navigate } } = this.props;
		await Action.loginWithFacebook();
		navigate('MainTabNavigator');
	};

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={background} style={{ flex: 1, justifyContent  : 'center' }} resizeMode='cover'>
					<View style={styles.form}>
						<View>
							<Image source={logo} resizeMode='contain' style={{ width: 400 * SCALE_RATIO, height : 400 * SCALE_RATIO,  marginTop : -50 * SCALE_RATIO}} />
						</View>
						<Button block primary style={styles.button} onPress={this._login}>
							<Text style={{ color: 'white', alignItems: 'center' }}>Facebook login</Text></Button>

					</View>
				</ImageBackground>
			</View>

		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	form: {
		height: 200 * SCALE_RATIO,
		alignItems: 'center',
		justifyContent: 'center',
		// flex: 1,
		// backgroundColor: 'green',
	},
	button: {
		borderRadius: 5,
		justifyContent: 'center',
		marginLeft: 100 * SCALE_RATIO,
		marginRight: 100 * SCALE_RATIO,
		marginTop : 200 * SCALE_RATIO
	}
});
