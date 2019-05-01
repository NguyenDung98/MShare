import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

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
				stateTrack: new Date().getTime(),
			})
	}
};

export const loginByFacebookProvider = async (accessToken) => {
	const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
	const {additionalUserInfo: {isNewUser, profile: {id}}, user} =
		await firebase.auth().signInAndRetrieveDataWithCredential(credential);

	saveUserToFirebase(isNewUser, id, user);
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

	userPublicInfo.onDisconnect().update({
		online: false,
	});
	firebase.database().ref('.info/connected')
		.on('value', snap => {
			if (snap.val()) {
				updateUserOnlineState(userPublicInfo);
				keyInterval = setInterval(() => {
					if (firebase.auth().currentUser) {
						updateUserOnlineState(userPublicInfo)
					} else {
						clearInterval(keyInterval);
					}
				}, 10000);
			} else {
				clearInterval(keyInterval);
			}
		})
};

export const updateUserOnlineState = userPublicInfo => {
	userPublicInfo.update({
		online: true,
		stateTrack: new Date().getTime(),
	});
};
