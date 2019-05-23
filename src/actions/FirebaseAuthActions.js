import firebase from 'react-native-firebase';
import store from "../store";
import {filterPlayingSongType, updateUserPublicInfo} from "./FirebaseMusicActions";
import {getPersonalPic} from "./FacebookAuthActions";

const saveUserToFirebase = async (isNewUser, id, user) => {
	const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${id}`);
	if (isNewUser) {
		userPublicInfo.set({
			online: true,
			stateTrack: new Date().getTime(),
			playingSong: 'inactive',
			sharing: true,
		});
		firebase.database().ref(`/users/${user.uid}`)
			.set({
				fb_id: id,
			});
	} else {
		userPublicInfo.update({
			online: true,
			stateTrack: new Date().getTime(),
			playingSong: 'inactive',
			sharing: true,
		});
	}
};

export const saveUserToStore = (user) => {
	const {providerData: [{displayName, uid}]} = user;

	store.setState({
		user: {
			name: displayName,
			id: uid,
		}
	});
	getPersonalPic(uid);
};

export const loginByFacebookProvider = async (accessToken) => {
	const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
	const {additionalUserInfo: {isNewUser, profile: {id}}, user} =
		await firebase.auth().signInWithCredential(credential);

	saveUserToFirebase(isNewUser, id, user);
};

export const toggleUserState = async (online) => {
	if (online) {
		updateUserPublicInfo({online})
	} else {
		updateUserPublicInfo({
			online,
			playingSong: 'inactive',
		});
	}
};

export const subscribeUserConnection = () => {
	const {currentUser: {providerData: [{uid}]}} = firebase.auth();
	const userPublicInfo = firebase.database().ref(`/usersPublicInfo/${uid}`);
	let keyInterval;

	userPublicInfo.onDisconnect().update({
		online: false,
		playingSong: 'inactive',
	});
	userPublicInfo.once('value', snapshot => {
		const {sharing, sharingSongs} = snapshot.val();

		store.setState({
			sharing,
			sharingSongs: sharingSongs ? sharingSongs : [],
		})
	});
	firebase.database().ref('/.info/connected')
		.on('value', snap => {
			if (snap.val()) {
				updateUserOnlineState();
				keyInterval = setInterval(() => {
					if (firebase.auth().currentUser) {
						updateUserOnlineState()
					} else {
						clearInterval(keyInterval);
					}
				}, 10000);
			} else {
				clearInterval(keyInterval);
			}
		})
};

export const updateUserOnlineState = () => {
	updateUserPublicInfo({
		online: true,
		stateTrack: new Date().getTime(),
	});
};

export const setUpUserFriendsInfo = async (userFriendsFbInfo) => {
	const usersPublicInfoRef = firebase.database().ref('/usersPublicInfo');

	userFriendsFbInfo.forEach(data => {
		usersPublicInfoRef.child(data.id).on('value', async (snapshot) => {
			const {userFriends} = store.getState();
			const playingSongID = snapshot.val() ? snapshot.val().playingSong : undefined;
			const playingSong = await filterPlayingSongType(playingSongID);

			store.setState({
				userFriends: {
					...userFriends,
					[data.id]: {
						...data,
						...snapshot.val(),
						playingSong,
					}
				}
			});
		})
	})
};

export const logOutFirebase = async () => {
	await toggleUserState(false);
	await firebase.auth().signOut();
};
