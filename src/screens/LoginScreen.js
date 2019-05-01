import React, {Component} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {Button} from 'native-base';

import {LoginManager, AccessToken} from "react-native-fbsdk";
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import {SCALE_RATIO} from '../constants/constants';
import {saveAccessToken, getAccessToken, saveAvt} from '../utils/asyncStorage';
import * as Action from "../actions";
import * as facebookAction from "../actions/FacebookAuthActions";

export default class Login extends Component {
	componentWillMount() {
		const {navigation: {navigate}} = this.props;

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				navigate('MainTabNavigator');
				facebookAction.getUserFriends();
				Action.subscribeUserConnection();
			}
			// console.log('Dont user');
		});
	};

	async checkExistToken() {
		const token = await getAccessToken();
		if (token !== '') {
			this.props.navigation.navigate('TabScreen');
		}
	}

	_login = async () => {
		const {navigation: {navigate}} = this.props;
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
				<View style={styles.form}>
					<Button block primary style={styles.button} onPress={this._login}>
						<Text style={{color: 'white', alignItems: 'center'}}>Facebook login</Text></Button>
					{/* <Button style={styles.button} /> */}
					{/* <Text>Hoặc</Text>
					<Button block info style={styles.button} onPress={() => {
						this.props.navigation.navigate('MainTabNavigator')
					}}>
						<Text style={{color: 'white', alignItems: 'center'}}>Tiếp tục</Text></Button> */}
				</View>
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
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: 'pink',
	},
	button: {
		borderRadius: 5,
		justifyContent: 'center',
		marginLeft: 100 * SCALE_RATIO,
		marginRight: 100 * SCALE_RATIO
	}
});
