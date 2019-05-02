import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { LoginManager } from 'react-native-fbsdk';
import { clearAccessToken } from '../utils/asyncStorage';
import firebase from '@firebase/app';
import { Button } from 'native-base';
import { SCALE_RATIO } from '../constants/constants';




export default class OtherScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logout}>
					<Button style={styles.button} onPress={() => {
						firebase.auth().signOut()
						// clearAccessToken(); 
						this.props.navigation.navigate('Login')
					}} >
						<View style={styles.text}>
							<Text style={{color : 'white'}} >Log out</Text>
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
		justifyContent: 'center',
		alignItems: 'center',
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
		flex : 1, 

		// color: 'white'
	}

})
