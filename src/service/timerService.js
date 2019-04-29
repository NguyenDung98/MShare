import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import {updateUserOnlineState} from "../actions";


module.exports = async () => {
	if (firebase && firebase.auth().currentUser) {
		const {currentUser: {providerData: [{uid}]}} = firebase.auth();
		const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${uid}`);

		updateUserOnlineState(userPublicInfo)
	}
};
