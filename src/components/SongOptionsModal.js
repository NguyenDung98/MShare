import React, {Component} from 'react';
import {Animated, Easing} from "react-native";

import OptionModal from "./OptionModal";
import SongToPlaylistOption from "./SongToPlaylistOption";
import TextInputBottomOption from "./TextInputBottomOption";
import SongOptions from "./SongOptions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as Action from "../actions";
import {SCREEN_HEIGHT} from "../utils";
import store from "../store";

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

export default class SongOptionsModal extends Component {
	state = DEFAULT_STATE;

	inputBoxPosition = new Animated.Value(0);
	overlayOpacity = new Animated.Value(0);

	componentWillReceiveProps(nextProps) {
		if (this.props.showModal !== nextProps.showModal
			&& nextProps.showModal
		) {
			this._toggleModal(false);
		}
	}

	_toggleModal = (showModal) => {
		const {boxHeight} = this.state;
		const {toggleModal} = this.props;
		const {selectedSong} = store.getState();

		if (!showModal) {
			const defaultBoxHeight = selectedSong.resource === 'device' ? 0.3 : 0.35;
			this.setState({
				selectedSong,
				boxHeight: defaultBoxHeight,
			});

			Animated.parallel([
				Animated.timing(this.inputBoxPosition, {
					toValue: -SCREEN_HEIGHT * defaultBoxHeight,
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
					toggleModal();
					this.setState({
						...DEFAULT_STATE,
					});
				}
			});
		}
	};

	_handleClickAddToPlayListBtn = () => {
		const {boxHeight} = this.state;

		Animated.timing(this.inputBoxPosition, {
			toValue: SCREEN_HEIGHT * boxHeight,
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
		const {boxHeight} = this.state;

		Animated.timing(this.inputBoxPosition, {
			toValue: SCREEN_HEIGHT * boxHeight,
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

	_handleDownloadOption = () => {
		Action.downloadSong();
	};

	_onAddSongToPlaylist = async (playlistIndex) => {
		try {
			const {selectedSong} = this.state;

			await Action.addToPlaylist(selectedSong, playlistIndex);
			this._toggleModal(true);
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

	render() {
		const {showModal} = this.props;
		const {
			selectedSong,
			boxHeight,
			showFirstOptionBox,
			showCreatePlaylistBox,
			newPlaylistTitle,
		} = this.state;

		return (
			<OptionModal
				visible={showModal}
				toggleModal={() => this._toggleModal(true)}
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
					<SongOptions
						song={selectedSong}
						closeModal={() => this._toggleModal(true)}
						onAddToPlaylist={this._handleClickAddToPlayListBtn}
						onDownload={this._handleDownloadOption}
					/>
				)}
			</OptionModal>
		);
	}
}
