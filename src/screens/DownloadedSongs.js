import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from "react-native";

import Song from "../components/Song";
import SongOptionsModal from "../components/SongOptionsModal";

import * as Action from "../actions";
import {colors, ITEM_HEIGHT, playSong, SCREEN_HEIGHT} from "../utils";
import store from "../store";

const keyExtractor = item => item.id;
const numOfFirstSongItems = Math.round(SCREEN_HEIGHT / ITEM_HEIGHT);

export default class DownloadedSongs extends Component {
	static navigationOptions = {
		title: "Tải xuống",
		headerStyle: {
			backgroundColor: colors.mainColor
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
				onPress={() => playSong(item)}
				onButtonPress={() => this._selectSong(item)}
			/>
		)
	};

	render() {
		const {showModal, boxHeight} = this.state;
		const {downloads: data, downloadingSong, downloadProgress} = store.getState();

		return (
			<View style={styles.container}>
				<FlatList
					ListHeaderComponent={downloadingSong && (
						<Song
							uri={downloadingSong.artwork}
							subTitle={downloadingSong.artist}
							title={downloadingSong.title}
							showProgress
							progress={downloadProgress}
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
