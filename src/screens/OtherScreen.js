import React, { Component } from 'react'
import { Text, View , Button} from 'react-native'
import { LoginManager } from 'react-native-fbsdk';
import { clearAccessToken } from '../utils/asyncStorage';
import firebase from 'react-native-firebase';



export default class OtherScreen extends Component {
	render() {
		return (
			<View>
				<Button title='Logout' onPress={()=> {
				firebase.auth().signOut()
				// clearAccessToken();
				this.props.navigation.navigate('Login')}} />
			</View>
		)
	}
}
