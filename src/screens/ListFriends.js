import React, {Component} from 'react'
import {View, Text, FlatList, Animated, Easing, Switch, StyleSheet} from 'react-native'

import Friend from "../components/Song";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OptionModal from "../components/OptionModal";
import FriendOptions from "../components/FriendOptions";
import SongToPlaylistOption from "../components/SongToPlaylistOption";
import TextInputBottomOption from "../components/TextInputBottomOption";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {SCREEN_HEIGHT} from "../utils";
import * as Action from "../actions";
import store from "../store";
import {SCALE_RATIO} from '../constants/constants';
import { colors } from '../utils/colors';

const keyExtractor = item => item.id;
const ANIMATION_CONFIG = {
	duration: 200,
	easing: Easing.linear(),
	useNativeDriver: true,
};
const DEFAULT_STATE = {
	showModal: false,
	selectedSong: null,
	selectedFriend: null,
	boxHeight: 0.3,
	showFirstOptionBox: false,
	showCreatePlaylistBox: false,
	newPlaylistTitle: '',
};

export default class ListFriends extends Component {
	state = {
		...DEFAULT_STATE,
		sharing: true,
	};

	inputBoxPosition = new Animated.Value(0);
	overlayOpacity = new Animated.Value(0);

	componentWillMount() {
		const {sharing} = store.getState();

		this.setState({
			sharing,
		})
	};

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_toggleModal = (friendID, song) => {
		const {showModal, boxHeight} = this.state;

		if (!showModal) {
			const hasSong = song && typeof song === 'object';
			const boxHeightAlt = hasSong ? 0.4 : 0.07;

			this.setState({
				showModal: true,
				selectedSong: song,
				selectedFriend: friendID,
				boxHeight: boxHeightAlt,
			});

			Animated.parallel([
				Animated.timing(this.inputBoxPosition, {
					toValue: -SCREEN_HEIGHT * boxHeightAlt,
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

	_moveToProfile = (userID) => {
		const {selectedFriend} = this.state;
		const {navigation: {navigate}} = this.props;

		navigate('Profile', {
			userID: userID ? userID : selectedFriend,
			type: 'friend',
		});
	};

	_changeSharingState = () => {
		const {sharing} = this.state;

		this.setState({
			sharing: !sharing,
		}, () => {
			Action.updateUserPublicInfo({
				sharing: !sharing,
			})
		})
	};

	_renderItem = ({item}) => {
		const {id, name, avatarUrl, playingSong, sharing} = item;
		const playingSongTitle = sharing ? (
			playingSong && typeof playingSong === "object" ? (
				<Text>
					<MaterialCommunityIcons
						name={'headphones'}
						size={15}
					/> {playingSong.title + ` - ${playingSong.artist}`}
				</Text>
			) : playingSong
		) : null;

		return (
			<Friend
				showBadge
				showAlternativeIcon={false}
				uri={avatarUrl}
				title={name}
				subTitle={playingSongTitle}
				avatarIconWidth={50}
				imageStyle={{borderRadius: 25}}
				onPress={() => this._moveToProfile(id)}
				onButtonPress={() => this._toggleModal(id, playingSong)}
			/>
		)
	};

	render() {
		const {
			selectedSong,
			boxHeight,
			showModal,
			showFirstOptionBox,
			showCreatePlaylistBox,
			newPlaylistTitle,
			sharing,
		} = this.state;
		const data = Object.values(store.getState().userFriends)
			.filter(({online, stateTrack}) =>
				online && stateTrack > new Date().getTime() - 15000);

		return (
			<View style={{flex: 1, backgroundColor : colors.background_color}}>
				<View style={styles.sharingContainer}>
					<Text style={{fontSize: 14}}>
						Chia sẻ với bạn bè:
					</Text>
					<Switch
						value={sharing}
						onValueChange={this._changeSharingState}
					/>
				</View>
				<FlatList
					ListEmptyComponent={(
						<View style={styles.noFriendOnline}>
							<Text style={styles.noFriendOnlineText}>Không có bạn bè online</Text>
						</View>
					)}
					data={data}
					renderItem={this._renderItem}
					keyExtractor={keyExtractor}
				/>
				<OptionModal
					visible={showModal}
					inputBoxPosition={this.inputBoxPosition}
					overlayOpacity={this.overlayOpacity}
					toggleModal={this._toggleModal}
					boxHeight={boxHeight * SCREEN_HEIGHT}
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
						<FriendOptions
							song={selectedSong}
							closeModal={this._toggleModal}
							onAddToPlaylist={this._handleClickAddToPlayListBtn}
							onMoveToProfile={this._moveToProfile}
						/>
					)}
				</OptionModal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	sharingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	noFriendOnline: {
		flex: 1,
		marginTop: 10
	},
	noFriendOnlineText: {
		textAlign: 'center',
	}
});
