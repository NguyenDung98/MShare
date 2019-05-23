import {updateUserOnlineState} from "../actions";
import firebase from "react-native-firebase";


module.exports = async () => {
	const {currentUser} = firebase.auth();

	if (currentUser) {
		updateUserOnlineState()
	}
};
