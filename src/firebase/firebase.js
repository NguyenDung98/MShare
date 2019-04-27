import firebase from '@firebase/app';
import '@firebase/storage';
import '@firebase/database'

const config = {
	apiKey: "AIzaSyC7XlAPLaPQng-o0zBqqco-sumoI8oXnm0",
	authDomain: "mshare-d1155.firebaseapp.com",
	databaseURL: "https://mshare-d1155.firebaseio.com",
	projectId: "mshare-d1155",
	storageBucket: "mshare-d1155.appspot.com",
	messagingSenderId: "53496378186"
};

export default firebase.initializeApp(config);
