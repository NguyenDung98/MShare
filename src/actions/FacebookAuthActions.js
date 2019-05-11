import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from "react-native-fbsdk";
import {saveAccessToken} from "../utils/asyncStorage";
import * as firebaseAction from "./FirebaseAuthActions";

const permissions = ["public_profile", "user_friends", "email"];

const infoRequest = new GraphRequest(
	'/me',
	{
		httpMethod: 'GET',
		parameters: {fields: {string: "friends{id,name}"}}
	},
	(error, result) => {
		if (!error) {
			const {friends: {data: userFriendsFbInfo}} = result;

			getProfilePic(userFriendsFbInfo);
		}
	}
);

const pictureRequest = (userID, picObject) =>  new GraphRequest(
	`/${userID}`,
	{
		httpMethod: 'GET',
		parameters: {
			fields: {
				string: 'picture.type(large)'
			}
		}
	},
	(error, result) => {
		if (!error) {
			const {id, picture: {data: {url}}} = result;
			picObject[id] = url;
		}
	}
);

export const loginWithFacebook = async () => {
	try {
		const loginResult = await LoginManager.logInWithReadPermissions(permissions);

		if (!loginResult.isCancelled) {
			const {accessToken} = await AccessToken.getCurrentAccessToken();

			saveAccessToken(accessToken.toString());
			firebaseAction.loginByFacebookProvider(accessToken);
		}
	} catch (e) {
		console.log(e);
	}
};

export const signOutFacebook = async () => {
	await LoginManager.logOut();
};

export const getUserFriends = () => {
	new GraphRequestManager().addRequest(infoRequest).start();
};

const getProfilePic = userFriendsFbInfo => {
	const requestManager = new GraphRequestManager();
	const picObject = {};

	requestManager.addBatchCallback(error => {
		if (!error) {
			firebaseAction.setUpUserFriendsInfo(userFriendsFbInfo.map(data => ({
				...data,
				avatarUrl: picObject[data.id],
			})));
		}
	});
	userFriendsFbInfo.forEach(({id}) => requestManager.addRequest(pictureRequest(id, picObject)));
	requestManager.start();
};
