import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button } from 'native-base';

import { LoginManager, AccessToken } from "react-native-fbsdk";
import firebase from 'react-native-firebase';

import { SCALE_RATIO } from '../constants/constants';
import { saveAccessToken, getAccessToken, saveAvt } from '../utils/asyncStorage';
import * as Action from "../actions";
import * as facebookAction from "../actions/FacebookAuthActions";

const logo = require('./../imgs/logoMshare.png')
const background = require('./../imgs/background.jpg')

export default class Login extends Component {
	componentWillMount() {
		const { navigation: { navigate } } = this.props;
		let firstCall = true;

		firebase.auth().onAuthStateChanged(user => {
			if (!firstCall && user) {
				navigate('MainTabNavigator');
				facebookAction.getUserFriends();
				Action.saveUserToStore(user);
				Action.subscribeUserConnection();
			}
			firstCall = false;
		});
	};

	async checkExistToken() {
		const token = await getAccessToken();
		if (token !== '') {
			this.props.navigation.navigate('TabScreen');
		}
	}

	_login = async () => {
		const { navigation: { navigate } } = this.props;
		await Action.loginWithFacebook();
		navigate('MainTabNavigator');
	};

	_fbAuth(self) {
		LoginManager.logInWithReadPermissions(["public_profile", "user_friends", "email"]).then(
			function (result) {
				if (result.isCancelled) {
					console.log("Login cancelled");
				} else {
					console.log(
						"Login success with permissions: " +
						result.grantedPermissions.toString()
					);
					AccessToken.getCurrentAccessToken().then(
						(data) => {
							saveAccessToken(data.accessToken.toString());
							console.log(getAccessToken());
							// Luu avatar
							fetch('https://graph.facebook.com/me?fields=picture&access_token=' + data.accessToken)
								.then((response) => response.json())
								.then((responseJson) => {
									console.log("===============PICTURE===========")
									console.log(responseJson)
									saveAvt(responseJson.picture.data.url)
								})
								.catch((error) => {
									console.error(error);
								});
							//Kiem tra Id co ton tai k
							fetch('https://graph.facebook.com/me?fields=id,name&access_token=' + data.accessToken)
								.then((response) => response.json())
								.then((responseJson) => {
									console.log("===============INFO USER==========")
									console.log(responseJson)
									firebase.database().ref().child('Users/' + responseJson.id).once('value', snapshot => {
										if (!snapshot.exists()) {
											firebase.database().ref('Users/' + responseJson.id).set({
												name: responseJson.name,
												state: true
											}).then((data) => {
												//success callback
												console.log('data ', data)
											}).catch((error) => {
												//error callback
												console.log('error ', error)
											})
										}
									})
								})
								.catch((error) => {
									console.error(error);
								});

							self.props.navigation.navigate("MainTabNavigator");
						}
					);
				}
			},
			function (error) {
				console.log("Login fail with error: " + error);
			}
		);
	}

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
		flex: 1
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
