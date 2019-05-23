import React, {Component} from 'react';
import {StyleSheet, View, FlatList, StatusBar} from "react-native";

import Song from "../components/Song";
import SongOptionsModal from "../components/SongOptionsModal";

import * as Action from "../actions";
import {colors, ITEM_HEIGHT, playSong, SCREEN_HEIGHT} from "../utils";
import store from "../store";

const keyExtractor = item => item.id;
const numOfFirstSongItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);

export default class UploadedSongs extends Component {
	static navigationOptions = {
		title: "Tải lên",
		headerStyle: {
			backgroundColor: colors.mainColor,
			height: 50 + StatusBar.currentHeight,
			paddingTop: StatusBar.currentHeight,
		},
		headerTintColor: colors.white
	};

	state = {
		showModal: false,
	};

	endItems =  numOfFirstSongItems;

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_loadAudios = (data) => {
		if (this.endItems < data.length) {
			this.endItems =  this.endItems + numOfFirstSongItems;
			this.forceUpdate();
		}
	};

	_getItemLayout = (data, index) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}
	};

	_selectSong = (song) => {
		Action.selectSong(song);
		this._toggleModal();
	};

	_toggleModal = () => {
		const {showModal} = this.state;

		this.setState({
			showModal: !showModal
		})
	};

	_renderItem = ({item}) => {
		const {artwork, artist, title} = item;

		return (
			<Song
				uri={artwork}
				subTitle={artist}
				title={title}
				onPress={async () => await playSong(item)}
				onButtonPress={() => this._selectSong(item)}
			/>
		)
	};

	render() {
		const {showModal, boxHeight} = this.state;
		const {uploads: data, uploadingSong, uploadProgress} = store.getState();

		return (
			<View style={styles.container}>
				<FlatList
					ListHeaderComponent={uploadingSong && (
						<Song
							uri={uploadingSong.artwork}
							subTitle={uploadingSong.artist}
							title={uploadingSong.title}
							showProgress
							progress={uploadProgress}
							showMoreButton={false}
						/>
					)}
					keyExtractor={keyExtractor}
					data={data.slice(0, this.endItems)}
					renderItem={this._renderItem}
					onEndReached={() => this._loadAudios(data)}
					getItemLayout={this._getItemLayout}
					showsVerticalScrollIndicator={false}
					initialNumToRender={numOfFirstSongItems}
				/>
				<SongOptionsModal
					showModal={showModal}
					toggleModal={this._toggleModal}
					boxHeight={boxHeight}
				/>
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
