import React, {Component} from 'react';
import {View, TextInput, StyleSheet, StatusBar, TouchableNativeFeedback} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import IconButton from "./IconButton";

import {colors} from "../utils";
import store from "../store";
import {SCALE_RATIO, HEADER_COLOR, ICON_COLOR} from '../constants/constants';
import * as Action from "../actions";

const BACK_BUTTON_SIZE = 40;

export default class SearchHeader extends Component {
	state = {
		searchValue: '',
	};

	_handleDisableSearch = () => {
		const {navigation} = this.props;

		navigation.goBack();
	};

	_handleTextChange = searchValue => {
		this.setState({searchValue})
	};

	_handleSearchMusicOnDevice = () => {
		const {songsInStorage, albums, artists, playlists} = store.getState();
		const searchValueLowerCase = this.state.searchValue.toLowerCase().trim();
		const searchedItems = {
			deviceSearchedSongs: songsInStorage.filter(song => song.title.toLowerCase().includes(searchValueLowerCase)),
			deviceSearchedAlbums: albums.filter(album => album.title.toLowerCase().includes(searchValueLowerCase)),
			deviceSearchedArtists: artists.filter(artist => artist.name.toLocaleLowerCase().includes(searchValueLowerCase)),
			deviceSearchedPlaylists: playlists.filter(playlist => playlist.title.toLocaleLowerCase().includes(searchValueLowerCase)),
		};

		store.setState({...searchedItems})
	};

	_handleSearchMusicOnline = async () => {
		const searchValueLowerCase = this.state.searchValue.trim();

		await Action.searchMusicOnline(searchValueLowerCase);
	};

	render() {
		const {online} = this.props;
		const {searchValue} = this.state;
		const {container, backBtnStyle, searchInputContainer, searchInput} = styles;
		const placeholder = online ? 'Nhập từ khóa' : 'Nhập tên bài hát, ca sĩ, album...';

		return (
			<View style={container}>
				<IconButton
					name={'ios-arrow-round-back'}
					iconSize={BACK_BUTTON_SIZE}
					style={backBtnStyle}
					color={ICON_COLOR}
					IconType={Ionicons}
					ButtonType={TouchableNativeFeedback}
					buttonProps={{
						background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
					}}
					onPress={this._handleDisableSearch}
				/>
				<View style={searchInputContainer}>
					<TextInput
						// autoFocus
						placeholder={placeholder}
						placeholderTextColor={colors.lightGrey}
						underlineColorAndroid={colors.lighterGrey}
						returnKeyType={'search'}
						style={searchInput}
						value={searchValue}
						onChangeText={this._handleTextChange}
						onSubmitEditing={online ? this._handleSearchMusicOnline : this._handleSearchMusicOnDevice}
					/>
				</View>
				<View
					style={backBtnStyle}
				/>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.mainColor,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: StatusBar.currentHeight + 5,
	},
	backBtnStyle: {
		marginLeft: 10,
		width: BACK_BUTTON_SIZE * 0.7,
		height: BACK_BUTTON_SIZE * 0.7,
		borderRadius: BACK_BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchInputContainer: {
		flexGrow: 1,
		maxWidth: '70%',
	},
	searchInput: {
		color: colors.white,
		fontSize: 15,
	},
});
