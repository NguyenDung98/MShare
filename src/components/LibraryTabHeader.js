import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Platform, TouchableNativeFeedback} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ICON_COLOR} from '../constants/constants';
import {colors, getAudioMetaData} from "../utils";
import IconButton from "./IconButton";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as Action from "../actions";
import store from "../store";

const BUTTON_SIZE = 40;

export default class LibraryTabHeader extends Component {
	loading = false;
	cursor = null;
	end = false;

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.loading = false;
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_handleDisableSearch = () => {
		const {navigation} = this.props;

		navigation.goBack();
	};

	_handleSearchPress = () => {
		const {navigation: {navigate}} = this.props;

		navigate('DeviceSearchTabScreen');
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

			await Action.saveDataToLocal();
			this.cursor = null;
			this.loading = false;
			this.end = false;
		} catch (e) {
			console.log('error: ' + e)
		}
	};

	_handleScanSongs = async () => {
		await Action.clearDataFromLocal();
		await this._getSongs();
		Action.setUpAlbumList();
		Action.setUpArtistList();
	};

	render() {
		const {container, searchBtnStyle, backBtnStyle} = styles;

		return (
			<View style={container}>
				<StatusBar
					backgroundColor={colors.brightRed}
				/>
				<IconButton
					name={'ios-arrow-round-back'}
					iconSize={BUTTON_SIZE}
					style={backBtnStyle}
					color={ICON_COLOR}
					IconType={Ionicons}
					ButtonType={TouchableNativeFeedback}
					buttonProps={{
						background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
					}}
					onPress={this._handleDisableSearch}
				/>
				<View style={{flexDirection: 'row'}}>
					<IconButton
						name={'radar'}
						IconType={MaterialCommunityIcons}
						iconSize={BUTTON_SIZE * 0.7}
						style={{...searchBtnStyle, marginHorizontal: 0}}
						color={ICON_COLOR}
						ButtonType={TouchableNativeFeedback}
						buttonProps={{
							background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
						}}
						onPress={this._handleScanSongs}
					/>
					<IconButton
						name={'search1'}
						IconType={AntDesign}
						iconSize={BUTTON_SIZE * 0.7}
						style={searchBtnStyle}
						color={ICON_COLOR}
						ButtonType={TouchableNativeFeedback}
						buttonProps={{
							background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
						}}
						onPress={this._handleSearchPress}
					/>
				</View>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	container: {
		height: 49,
		backgroundColor: colors.brightRed,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	backBtnStyle: {
		marginLeft: 10,
		width: BUTTON_SIZE * 0.7,
		height: BUTTON_SIZE * 0.7,
		borderRadius: BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBtnStyle: {
		marginHorizontal: 10,
		width: BUTTON_SIZE * 0.7,
		height: BUTTON_SIZE * 0.7,
		borderRadius: BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
