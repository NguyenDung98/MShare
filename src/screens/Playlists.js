import React, {Component} from 'react';
import {Alert, Easing, View, TouchableWithoutFeedback, Text, FlatList, StyleSheet, Animated} from 'react-native';
import ListItem from "../components/Song";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {colors, SCREEN_HEIGHT} from "../utils";
import OptionModal from "../components/OptionModal";
import * as Action from "../actions";
import store from "../store";
import TextInputBottomOption from "../components/TextInputBottomOption";
import PlaylistOption from "../components/PlaylistOption";

const keyExtractor = (_, index) => index.toString();
const ANIMATION_CONFIG = {
	duration: 200,
	easing: Easing.linear(),
	useNativeDriver: true,
};
const DEFAULT_STATE = {
	showModal: false,
	newPlaylistTitle: '',
	editableTitle: '',
	showCreatePlaylistBox: false,
	showEditPlaylistTitleBox: false,
	selectedPlaylist: null,
	selectedPlaylistIndex: -1,
	boxHeight: 0,
};

export default class Playlists extends Component {
	static navigationOptions = {
		title: 'Playlist'
	};

	state = DEFAULT_STATE;

	inputBoxPosition = new Animated.Value(0);
	overlayOpacity = new Animated.Value(0);

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_toggleModal = (selectedPlaylist, selectedPlaylistIndex) => {
		const {showModal, boxHeight} = this.state;

		if (!showModal) {
			this.setState({
				showModal: !showModal,
				selectedPlaylist,
				selectedPlaylistIndex,
			});

			Animated.parallel([
				Animated.timing(this.inputBoxPosition, {
					toValue: -SCREEN_HEIGHT * boxHeight,
					...ANIMATION_CONFIG,
				}),
				Animated.timing(this.overlayOpacity, {
					toValue: 0.5,
					...ANIMATION_CONFIG,
				})
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(this.inputBoxPosition, {
					toValue: SCREEN_HEIGHT * boxHeight,
					...ANIMATION_CONFIG,
				}),
				Animated.timing(this.overlayOpacity, {
					toValue: 0,
					...ANIMATION_CONFIG,
				})
			]).start(({finished}) => {
				if (finished) {
					this.setState({
						...DEFAULT_STATE,
					});
				}
			});
		}
	};

	_handleClickCreatePlaylistBtn = () => {
		this.setState({
			showCreatePlaylistBox: true,
			boxHeight: 0.18,
		}, () => {
			this._toggleModal();
		});
	};

	_handleClickMoreBtn = (selectedPlaylist, index) => {
		this.setState({
			showCreatePlaylistBox: false,
			boxHeight: 0.3,
		}, () => {
			this._toggleModal(selectedPlaylist, index)
		})
	};

	_handleEditPlaylistTitle = () => {
		const {boxHeight, selectedPlaylist} = this.state;

		Animated.timing(this.inputBoxPosition, {
			toValue: SCREEN_HEIGHT * boxHeight,
			...ANIMATION_CONFIG,
		}).start(({finished}) => {
			if (finished) {
				this.setState({
					boxHeight: 0.18,
					showEditPlaylistTitleBox: true,
					editableTitle: selectedPlaylist.title,
				}, () => {
					Animated.timing(this.inputBoxPosition, {
						toValue: -SCREEN_HEIGHT * 0.18,
						...ANIMATION_CONFIG,
					}).start();
				})
			}
		})
	};

	_onClickDeleteBtn = () => {
		const {selectedPlaylist} = this.state;

		Alert.alert(
			'Cảnh báo',
			"Bạn muốn xóa: " + selectedPlaylist.title,
			[
				{text: 'Xác nhận', onPress: this._handleDeletePlaylist},
				{text: 'Huỷ bỏ', style: 'cancel'}
			]
		)
	};

	_handleDeletePlaylist = async () => {
		const {selectedPlaylistIndex} = this.state;

		await Action.deletePlaylist(selectedPlaylistIndex);
		this._toggleModal();
	};

	_handleSubmitEditTitle = async () => {
		const {editableTitle, selectedPlaylistIndex} = this.state;

		await Action.updatePlaylist({
			title: editableTitle,
		}, selectedPlaylistIndex);

		this._toggleModal();
	};

	_onTextChange = (key, value) => {
		this.setState({[key]: value});
	};

	_createNewPlaylist = async () => {
		try {
			const {newPlaylistTitle} = this.state;

			await Action.createNewPlaylist(newPlaylistTitle);
			this.setState({
				newPlaylistTitle: '',
			});
			this._toggleModal();
		} catch (e) {
			console.log('error: ' + e);
		}
	};

	_renderItem = ({item, index}) => {
		const {title, songs} = item;
		const {navigation: {navigate, getParam}} = this.props;

		return (
			<ListItem
				title={title}
				subTitle={songs.length + ' bài hát'}
				avatarIconName={'queue-music'}
				avatarIconType={MaterialIcons}
				avatarIconWidth={50}
				imageStyle={{
					width: 65,
				}}
				onButtonPress={() => this._handleClickMoreBtn(item, index)}
				onPress={() => navigate('CollectionDetail', {
					type: 'Playlist',
					index,
					dataName: getParam('dataName'),
				})}
			/>
		)
	};

	render() {
		const {container, createBtnStyle, titleCreateBtnStyle} = styles;
		const {navigation: {getParam}} = this.props;
		const {
			showCreatePlaylistBox,
			newPlaylistTitle,
			showModal,
			boxHeight,
			selectedPlaylist,
			showEditPlaylistTitleBox,
			editableTitle,
		} = this.state;
		const dataName = getParam('dataName');

		return (
			<View style={container}>
				<TouchableWithoutFeedback onPress={this._handleClickCreatePlaylistBtn}>
					<View style={createBtnStyle}>
						<Text style={titleCreateBtnStyle}>
							Tạo playlist
						</Text>
					</View>
				</TouchableWithoutFeedback>
				<FlatList
					keyExtractor={keyExtractor}
					data={[...store.getState()[dataName]]}
					renderItem={this._renderItem}
				/>
				<OptionModal
					visible={showModal}
					toggleModal={this._toggleModal}
					inputBoxPosition={this.inputBoxPosition}
					overlayOpacity={this.overlayOpacity}
					boxHeight={SCREEN_HEIGHT * boxHeight}
				>
					{showCreatePlaylistBox ? (
						<TextInputBottomOption
							title={'Nhập tên playlist'}
							text={newPlaylistTitle}
							onTitleChange={(text) => this._onTextChange('newPlaylistTitle', text)}
							onSubmit={this._createNewPlaylist}
							iconName={'playlist-add'}
							IconType={MaterialIcons}
							iconSize={40}
						/>
					) : showEditPlaylistTitleBox ? (
						<TextInputBottomOption
							title={'Sửa tên playlist'}
							text={editableTitle}
							onTitleChange={(text) => this._onTextChange('editableTitle', text)}
							iconName={'edit'}
							IconType={MaterialIcons}
							iconSize={35}
							onSubmit={this._handleSubmitEditTitle}
						/>
					) : (
						<PlaylistOption
							playlist={selectedPlaylist}
							closeModal={this._toggleModal}
							onEditPlaylistTitle={this._handleEditPlaylistTitle}
							onDeletePlaylist={this._onClickDeleteBtn}
						/>
					)}
				</OptionModal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	createBtnStyle: {
		marginVertical: 15,
		marginHorizontal: '20%',
		borderRadius: 20,
		padding: 10,
		backgroundColor: colors.brightRed,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.lighterGrey,
		elevation: 5,
	},
	titleCreateBtnStyle: {
		color: colors.white,
		fontSize: 18,
	},
});
