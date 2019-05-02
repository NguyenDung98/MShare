import firebase from 'react-native-firebase';
import {updateUserOnlineState} from "../actions";


module.exports = async () => {
	if (firebase && firebase.auth().currentUser) {
		const {currentUser: {providerData: [{uid}]}} = firebase.auth();
		const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${uid}`);

		updateUserOnlineState(userPublicInfo)
	}
};
