import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Animated, Easing} from "react-native";
import Song from "../components/Song";

import {colors, ITEM_HEIGHT, numOfFirstItems, playSong, SCREEN_HEIGHT} from "../utils";
import store from "../store";
import * as Action from "../actions";
import OptionModal from "../components/OptionModal";
import SongOption from "../components/SongOption";
import SongToPlaylistOption from "../components/SongToPlaylistOption";
import TextInputBottomOption from "../components/TextInputBottomOption";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const keyExtractor = item => item.id;
const ANIMATION_CONFIG = {
	duration: 200,
	easing: Easing.linear(),
	useNativeDriver: true,
};
const DEFAULT_STATE = {
	showModal: false,
	selectedSong: null,
	boxHeight: 0.3,
	showFirstOptionBox: false,
	showCreatePlaylistBox: false,
	newPlaylistTitle: '',
};

export default class SongList extends Component {
	static navigationOptions = {
		tabBarLabel: "Danh sách nhạc"
	};

	state = DEFAULT_STATE;

	inputBoxPosition = new Animated.Value(0);
	overlayOpacity = new Animated.Value(0);

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_loadAudios = () => {
		Action.addToDisplaySongList(numOfFirstItems);
	};

	_getItemLayout = (data, index) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}
	};

	_toggleModal = (song) => {
		const {showModal, boxHeight} = this.state;

		if (!showModal) {
			this.setState({
				showModal: true,
				selectedSong: song,
			});

			Animated.parallel([
				Animated.timing(this.inputBoxPosition, {
					toValue: -SCREEN_HEIGHT * 0.3,
					...ANIMATION_CONFIG
				}),
				Animated.timing(this.overlayOpacity, {
					toValue: 0.5,
					...ANIMATION_CONFIG
				})
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(this.inputBoxPosition, {
					toValue: SCREEN_HEIGHT * boxHeight,
					...ANIMATION_CONFIG
				}),
				Animated.timing(this.overlayOpacity, {
					toValue: 0,
					...ANIMATION_CONFIG
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

	_handleClickAddToPlayListBtn = () => {
		Animated.timing(this.inputBoxPosition, {
			toValue: SCREEN_HEIGHT * 0.3,
			...ANIMATION_CONFIG
		}).start(({finished}) => {
			if (finished) {
				this.setState({
					showFirstOptionBox: true,
					boxHeight: 0.5,
				}, () => {
					Animated.timing(this.inputBoxPosition, {
						toValue: -SCREEN_HEIGHT * 0.5,
						...ANIMATION_CONFIG,
					}).start();
				});
			}
		});
	};

	_handleClickCreatePlaylistBtn = () => {
		Animated.timing(this.inputBoxPosition, {
			toValue: SCREEN_HEIGHT * 0.5,
			...ANIMATION_CONFIG
		}).start(({finished}) => {
			if (finished) {
				this.setState({
					showFirstOptionBox: false,
					showCreatePlaylistBox: true,
					boxHeight: 0.18,
				}, () => {
					Animated.timing(this.inputBoxPosition, {
						toValue: -SCREEN_HEIGHT * 0.18,
						...ANIMATION_CONFIG,
					}).start();
				});
			}
		});
	};

	_onAddSongToPlaylist = async (playlistIndex) => {
		try {
			const {selectedSong} = this.state;

			await Action.addToPlaylist(selectedSong, playlistIndex);
			this._toggleModal();
		} catch (e) {
			console.log(e);
		}
	};

	_onTitleChange = newPlaylistTitle => {
		this.setState({newPlaylistTitle});
	};

	_onCreateNewPlaylist = async () => {
		try {
			const {newPlaylistTitle} = this.state;

			await Action.createNewPlaylist(newPlaylistTitle);
			this._onAddSongToPlaylist(1);
		} catch (e) {
			console.log('error: ' + e);
		}
	};

	_renderItem = ({item}) => {
		const {artwork, artist, title} = item;

		return (
			<Song
				uri={artwork}
				subTitle={artist}
				title={title}
				onPress={() => playSong(item)}
				onButtonPress={() => this._toggleModal(item)}
			/>
		)
	};

	render() {
		const {navigation: {getParam}} = this.props;
		const data = getParam('dataName');
		const {selectedSong, boxHeight, showModal, showFirstOptionBox, showCreatePlaylistBox, newPlaylistTitle} = this.state;

		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={keyExtractor}
					data={store.getState()[data]}
					renderItem={this._renderItem}
					onEndReached={this._loadAudios}
					getItemLayout={this._getItemLayout}
					removeClippedSubviews
					showsVerticalScrollIndicator={false}
					initialNumToRender={numOfFirstItems}
					windowSize={11}
				/>
				<OptionModal
					visible={showModal}
					toggleModal={this._toggleModal}
					overlayOpacity={this.overlayOpacity}
					inputBoxPosition={this.inputBoxPosition}
					boxHeight={SCREEN_HEIGHT * boxHeight}
				>
					{showFirstOptionBox ? (
						<SongToPlaylistOption
							song={selectedSong}
							onClickCreateBtn={this._handleClickCreatePlaylistBtn}
							onAddToPlaylist={this._onAddSongToPlaylist}
						/>
					) : showCreatePlaylistBox ? (
						<TextInputBottomOption
							title={'Nhập tên playlist'}
							text={newPlaylistTitle}
							onTitleChange={this._onTitleChange}
							onSubmit={this._onCreateNewPlaylist}
							iconName={'playlist-add'}
							IconType={MaterialIcons}
							iconSize={40}
						/>
					) : (
						<SongOption
							song={selectedSong}
							closeModal={this._toggleModal}
							onAddToPlaylist={this._handleClickAddToPlayListBtn}
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
});
