import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/storage';
import { Platform, InteractionManager } from 'react-native';

import AppNavigator from "./src/navigation/AppNavigator"

export default class App extends Component {
	// componentDidMount() {
	// 	const config = {
	// 		apiKey: "AIzaSyC7XlAPLaPQng-o0zBqqco-sumoI8oXnm0",
	// 		authDomain: "mshare-d1155.firebaseapp.com",
	// 		databaseURL: "https://mshare-d1155.firebaseio.com",
	// 		projectId: "mshare-d1155",
	// 		storageBucket: "mshare-d1155.appspot.com",
	// 		messagingSenderId: "53496378186"
	// 	};
	// 	firebase.initializeApp(config);
	// 	let storage = firebase.storage();
	// 	let songRef = storage.ref().child('music');

	// 	// songRef.getDownloadURL()
	// 	// 	.then((url) => {
	// 	// 		console.log('=============URL===============')
	// 	// 		console.log(url);
	// 	// 	},
	// 	// 		function (error) {
	// 	// 			console.log('============ERR===============')

	// 	// 			console.log(error);
	// 	// 		});
	// 	console.log("==========+SONG+==========");
	// 	// songRef.getMetadata()
	// 	// .then(data => console.log(data))
	// 	console.log(songRef)

	// 	const _setTimeout = global.setTimeout;
	// 	const _clearTimeout = global.clearTimeout;
	// 	const MAX_TIMER_DURATION_MS = 60 * 1000;
	// 	if (Platform.OS === 'android') {
	// 		// Work around issue `Setting a timer for long time`
	// 		// see: https://github.com/firebase/firebase-js-sdk/issues/97
	// 		const timerFix = {};
	// 		const runTask = (id, fn, ttl, args) => {
	// 			const waitingTime = ttl - Date.now();
	// 			if (waitingTime <= 1) {
	// 				InteractionManager.runAfterInteractions(() => {
	// 					if (!timerFix[id]) {
	// 						return;
	// 					}
	// 					delete timerFix[id];
	// 					fn(...args);
	// 				});
	// 				return;
	// 			}

	// 			const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
	// 			timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
	// 		};

	// 		global.setTimeout = (fn, time, ...args) => {
	// 			if (MAX_TIMER_DURATION_MS < time) {
	// 				const ttl = Date.now() + time;
	// 				const id = '_lt_' + Object.keys(timerFix).length;
	// 				runTask(id, fn, ttl, args);
	// 				return id;
	// 			}
	// 			return _setTimeout(fn, time, ...args);
	// 		};

	// 		global.clearTimeout = id => {
	// 			if (typeof id === 'string' && id.startWith('_lt_')) {
	// 				_clearTimeout(timerFix[id]);
	// 				delete timerFix[id];
	// 				return;
	// 			}
	// 			_clearTimeout(id);
	// 		};
	// 	}

	

		// var bucket = firebase.storage().ref().bucket;
		// console.log(bucket);
		// var firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket + "/o/";
		// console.log(firebaseUrl);

		// var finalUrl = firebaseUrl + 'music';
		// firebase.auth().currentUser.getToken();
		// console.log(finalUrl);
		// firebase.auth().currentUser.getToken()
		// 	.then((token) => {
		// 		fetch(finalUrl, { headers: { 'Authorization': 'Firebase ' + token } })
		// 			.then((response) => response.json())
		// 			.then((responseJson) => {
		// 				var downloadURL = finalUrl + "?alt=media&token=" + responseJson.downloadTokens
		// 				console.log(downloadURL);
		// 			})
		// 	})

	// }

	render() {
		return <AppNavigator />
	}
}
