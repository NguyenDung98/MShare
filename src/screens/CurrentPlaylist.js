import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from "../utils";
import Song from "../components/Song";
import store from "../store";
import TrackPlayer from "react-native-track-player";

const keyExtractor = item => item.id;

export default class CurrentPlaylist extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item, index}) => {
		const {artist, title} = item;
		const {currentPlaySongIndex} = store.getState();

		if (currentPlaySongIndex === index) {
			return (
				<Song
					subTitle={artist}
					title={title}
					showAvatar={false}
					onPress={async () => {
						await TrackPlayer.skip(item.id);
						await TrackPlayer.play();
					}}
					subTitleColor={colors.brighterRed}
					titleColor={colors.brightRed}
				/>
			)
		}

		return (
			<Song
				subTitle={artist}
				title={title}
				showAvatar={false}
				onPress={async () => {
					await TrackPlayer.skip(item.id);
					await TrackPlayer.play();
				}}
			/>
		)
	};

	render() {
		const {currentPlaylist, currentPlaySongIndex} = store.getState();

		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={keyExtractor}
					data={currentPlaylist}
					extraData={currentPlaySongIndex}
					renderItem={this._renderItem}
					// getItemLayout={this._getItemLayout}
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