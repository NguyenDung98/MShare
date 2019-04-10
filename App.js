import React, {Component} from 'react';
import firebase from '@firebase/app';
import '@firebase/storage';

// <<<<<<< HEAD
// import Playing from "./src/screens/Playing";
// import SongList from "./src/screens/SongList";
// =======
import AppNavigator from "./src/navigation/AppNavigator"
// >>>>>>> huyen

export default class App extends Component {
	componentDidMount() {
		const config = {
			apiKey: "AIzaSyC7XlAPLaPQng-o0zBqqco-sumoI8oXnm0",
			authDomain: "mshare-d1155.firebaseapp.com",
			databaseURL: "https://mshare-d1155.firebaseio.com",
			projectId: "mshare-d1155",
			storageBucket: "mshare-d1155.appspot.com",
			messagingSenderId: "53496378186"
		};
		firebase.initializeApp(config);
		let storage = firebase.storage();
		let songRef = storage.ref('music/BeautifulInWhite-ShaneFilan-524801.mp3');
		console.log(songRef);
	}

	render() {
        return <AppNavigator/>
    }
}
