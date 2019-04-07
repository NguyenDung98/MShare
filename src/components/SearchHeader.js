import React, {Component} from 'react';
import {View, TextInput, StyleSheet, StatusBar, Platform} from 'react-native';
import {SCALE_RATIO, HEADER_COLOR, ICON_COLOR} from '../constants/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from "../utils";
import store from "../store";

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

	_handleSearchMusic = () => {
		const {songsInStorage} = store.getState();
		const searchValueLowerCase = this.state.searchValue.toLowerCase();
		const searchedSongs = songsInStorage.filter(song => song.title.toLowerCase().includes(searchValueLowerCase));

		store.setState({searchedSongs})
	};

	render() {
		const {searchValue} = this.state;
		const {container, icon, searchInputContainer, searchInput} = styles;

		return (
			<View style={container}>
				<StatusBar backgroundColor={HEADER_COLOR}/>
				<MaterialCommunityIcons
					name={'keyboard-backspace'}
					size={60 * SCALE_RATIO}
					style={icon}
					color={ICON_COLOR}
					onPress={this._handleDisableSearch}
				/>
				<View style={searchInputContainer}>
					<TextInput
						autoFocus
						placeholder={'Nhập tên bài hát, album, ca sĩ...'}
						placeholderTextColor={colors.lightGrey}
						underlineColorAndroid={colors.lighterGrey}
						returnKeyType={'search'}
						style={searchInput}
						value={searchValue}
						onChangeText={this._handleTextChange}
						onSubmitEditing={this._handleSearchMusic}
					/>
				</View>
				<View
					style={[icon, {width: 60 * SCALE_RATIO}]}
				/>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: HEADER_COLOR,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 10,
	},
	icon: {
		marginHorizontal: 34 * SCALE_RATIO,
		// paddingTop: 30 * SCALE_RATIO,
		alignItems: "center",
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
