import {updateUserOnlineState} from "../actions";
import store from "../store";


module.exports = async () => {
	const {isLogin} = store.getState();

	if (isLogin) {
		updateUserOnlineState()
	}
};
