import React, {Component} from 'react';
import {AppState, View} from "react-native";
import AppNavigator from "./src/navigation/AppNavigator"
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import StaticPlayingWidget from "./src/components/StaticPlayingWidget";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import TrackPlayer from "react-native-track-player";

import NavigationService from "./src/service/navigationService";
import * as Action from './src/actions/'
import {
	firebaseConfig,
	getAudioMetaData,
	numOfFirstItems,
	SONG_ITEM_WIDTH,
	trackPlayerUpdateOptions
} from "./src/utils";
import store from "./src/store";

export default class App extends Component {
	loading = false;
	cursor = null;
	end = false;

	async componentWillMount() {
		try {
			this.unsubcribe = store.onChange(() => {
				this.forceUpdate();
				this.loading = false;
			});
			this.subscriptions = Action.subscriptions;
			AppState.addEventListener('change', this._handleAppStateChange);

			// setup firebase
			firebase.initializeApp(firebaseConfig);
			// setup local data
			if (!await Action.setUpLocalData()) {
				await this._getSongs();
				Action.addToDisplaySongList(numOfFirstItems);
				Action.setUpAlbumList();
				Action.setUpArtistList();
			}
			// setup track player
			await TrackPlayer.setupPlayer();
			TrackPlayer.updateOptions(trackPlayerUpdateOptions);
		} catch (e) {
			console.log('error: ' + e)
		}
	}

	componentWillUnmount() {
		this.unsubcribe();
		this.subscriptions.forEach(subscription => subscription.remove());
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = appState => {
		store.setState({appState});
	};

	_getSongs = async (after) => {
		try {
			if (this.loading || this.end) return;

			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status !== 'granted') {
				console.log("Camera roll permissions denied");
				return;
			}

			this.loading = true;

			const results = await MediaLibrary.getAssetsAsync({
				first: 100,
				mediaType: "audio",
				sortBy: "id",
				after,
			});

			const {assets, endCursor, hasNextPage} = results;
			const songs = await getAudioMetaData(assets);

			this.cursor = hasNextPage ? endCursor : null;
			this.end = !hasNextPage;
			if (Action.addToSongList(songs)) await this._getSongs(endCursor);
			await Action.saveData();
		} catch (e) {
			console.log('error: ' + e)
		}
	};

	render() {
		const {showStaticWidget} = store.getState();

		return (
			<View style={{flex: 1}}>
				<AppNavigator
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef)
                    }}
                />
				{showStaticWidget && (
					<View style={{height: SONG_ITEM_WIDTH}}>
						<StaticPlayingWidget/>
					</View>
				)}
			</View>
		)
	}
}
