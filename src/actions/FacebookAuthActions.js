import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from "react-native-fbsdk";
import {saveAccessToken} from "../utils/asyncStorage";
import store from "../store";
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import timerService from '../service/timerService';

const infoRequest = new GraphRequest(
	'/me',
	{
		httpMethod: 'GET',
		parameters: {fields: {string: "friends{id,name}"}}
	},
	(error, result) => {
		if (!error) {
			store.setState({
				userFriends: result,
			});
		}
	}
);

const saveUserToFirebase = async (isNewUser, id, user) => {
	if (isNewUser) {
		firebase.database().ref(`/usersPublicInfo/${id}`)
			.set({
				online: true,
				stateTrack: new Date().getTime(),
			});
		firebase.database().ref(`/users/${user.uid}`)
			.set({
				fb_id: id,
			});
	} else {
		firebase.database().ref(`/usersPublicInfo/${id}`)
			.update({
				online: true,
			})
	}
};

export const loginWithFacebook = async () => {
	try {
		const loginResult = await LoginManager.logInWithReadPermissions(["public_profile", "user_friends", "email"]);

		if (!loginResult.isCancelled) {
			const {accessToken} = await AccessToken.getCurrentAccessToken();
			const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
			const {additionalUserInfo: {isNewUser, profile: {id}}, user} =
				await firebase.auth().signInAndRetrieveDataWithCredential(credential);

			saveAccessToken(accessToken.toString());
			new GraphRequestManager().addRequest(infoRequest).start();
			await saveUserToFirebase(isNewUser, id, user);
		}
	} catch (e) {
		console.log(e);
	}
};

export const toggleUserState = async (online) => {
	const {currentUser: {providerData: [{uid}]}} = firebase.auth();

	firebase.database().ref(`/usersPublicInfo/${uid}`)
		.update({
			online,
		});
};

export const subscribeUserConnection = () => {
	const {currentUser: {providerData: [{uid}]}} = firebase.auth();
	const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${uid}`);
	let keyInterval;

	firebase.database().ref('.info/connected')
		.on('value', snap => {
			if (snap.val()) {
				updateUserOnlineState(userPublicInfo);
				// keyInterval = setInterval(() => {
				// 	updateUserOnlineState(userPublicInfo)
				// }, 10000) // > 15000
				keyInterval = timerService()
			} else {
				clearInterval(keyInterval);
				userPublicInfo.onDisconnect().update({
					online: false,
				})
			}
		})
};

const updateUserOnlineState = userPublicInfo => {
	userPublicInfo.update({
		online: true,
		stateTrack: new Date().getTime(),
	});
};
