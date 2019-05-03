import { getAccessToken } from "../utils/asyncStorage";

export function getListFriend() {
	getAccessToken().then((token) => {
		console.log(token)
		fetch('https://graph.facebook.com/me?fields=friends{id,first_name,last_name}&access_token=' + token)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log("===============FRIENDS===========")
				console.log(responseJson)
			})
			.catch((error) => {
				console.error(error);
			});
		// })
		// .catch((error) => {
		// console.error(error);
		// });


	})
}
