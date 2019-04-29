import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from "react-native-fbsdk";
import {saveAccessToken} from "../utils/asyncStorage";
import store from "../store";
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
			store.setState({
				userFriends: result,
			});
		}
	}
);

export const loginWithFacebook = async () => {
	try {
		const loginResult = await LoginManager.logInWithReadPermissions(permissions);

		if (!loginResult.isCancelled) {
			const {accessToken} = await AccessToken.getCurrentAccessToken();

			saveAccessToken(accessToken.toString());
			getUserFriends();
			firebaseAction.loginByFacebookProvider(accessToken);
		}
	} catch (e) {
		console.log(e);
	}
};

export const getUserFriends = () => {
	new GraphRequestManager().addRequest(infoRequest).start();
};
