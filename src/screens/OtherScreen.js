import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button } from 'native-base';

import { SCALE_RATIO } from '../constants/constants';
import * as Action from "../actions";
import { colors } from '../utils';

const logo = require('./../imgs/logoMshare.png')

export default class OtherScreen extends Component {
	_handlePressLogOutBtn = async () => {
		const {navigation: {navigate}} = this.props;

		await Action.signOutFacebook();
		await Action.logOutFirebase();
		navigate('Login')
	};

	render() {
		return (
			<View style={styles.container}>
				<Image source={logo} resizeMode='contain' style={{ width: 400 * SCALE_RATIO, height: 400 * SCALE_RATIO, marginBottom: 100 * SCALE_RATIO, marginTop : 200 *SCALE_RATIO }} />
				<View style={styles.logout}>
					<Button style={styles.button} onPress={async () => await this._handlePressLogOutBtn()} >
						<View style={styles.text}>
							<Text style={{ color: 'white' }} >Log out</Text>
						</View>
					</Button>

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.background_color
	},
	logout: {
		// marginLeft: 100*SCALE_RATIO,
		// marginRight: 100*SCALE_RATIO,
	},
	button:
	{
		width: 400 * SCALE_RATIO,
		borderRadius: 5,
		backgroundColor: '#FFB74D',
	},
	text: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,

		// color: 'white'
	}

})
