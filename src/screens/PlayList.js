import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from "../utils";
import Song from "../components/Song";
import store from "../store";
import TrackPlayer from "react-native-track-player";

const keyExtractor = item => item.id;

export default class PlayList extends Component {
	_renderItem = ({item}) => {
		const {artist, title} = item;

		return (
			<Song
				artist={artist}
				songTitle={title}
				showAvatar={false}
				onPress={async () => {
					await TrackPlayer.skip(item.id);
					await TrackPlayer.play();
				}}
			/>
		)
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={keyExtractor}
					data={store.getState().playList}
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
