import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/storage';
import '@firebase/database';

export default class PlayingOnline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listMusics: [],
			listMusicNames: [],
		};
		console.ignoredYellowBox = [
			'Setting a timer'
		];
	}

	writeUserData(name = '') {
		firebase.database().ref('Musics/').push({
			name
		}).then((data) => {
			//success callback
			console.log('data ', data)
		}).catch((error) => {
			//error callback
			console.log('error ', error)
		})
	}

	componentDidMount() {
		this.readUserData();

	}

	writeAll() {
		let arr = ["BeautifulInWhite-ShaneFilan-524801.mp3",
			"I Need Your Love - Madilyn Bailey, Jake Coco.mp3",
			"NguoiTinhMuaDongCover-HaAnhTuan-5074575.mp3"];
		for (let i = 0; i < arr.length; i++) {
			console.log(arr[i]);
			this.writeUserData(arr[i])
		}
	}


	async readUserData() {
		var tpm = [];
		var names = []
		await firebase.database().ref('Musics/').once('value', function (snapshot) {
			console.log(snapshot.val())
			const arr = snapshot.val();
			console.log(tpm)
			// for all name
			for (key in arr) {
				//1. Get name
				var music = {
					name: '',
					url: ''
				}
				console.log("NAME " + arr[key].name)
				music.name = arr[key].name;
				names.push(arr[key].name);

				//2. download url
				let trackname = "music/" + music.name;
				var storageRef = firebase.storage().ref(trackname);
				storageRef.getDownloadURL().then(function (url) {
					music.url = url
					tpm.push(music)
				});

			}
		});
		this.setState({listMusics: tpm, listMusicNames: names});
		console.log("=======musics=========")
		console.log(this.state.listMusics)
	}

	getuUrlMusicByName(name) {
		console.log(name);
		let trackname = "music/" + name;
		var storageRef = firebase.storage().ref(trackname);
		storageRef.getDownloadURL().then(function (url) {
			music.url = url;
		});
	}

	render() {
		return (
			<View>
				<Button onPress={() => {
					this.readUserData();
				}} title="SHOW"/>
				<Button title={'To list friend'} onPress={() => {
					this.props.navigation.navigate('ListFriends')
				}}/> </View>
		);
	}
}
