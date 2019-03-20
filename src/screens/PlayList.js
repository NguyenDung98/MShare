import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from "../utils";
import Song from "../components/Song";
import store from "../store";
import * as Action from "../actions";
import TrackPlayer from "react-native-track-player";

const keyExtractor = item => item.id;

export default class PlayList extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange( () => {
			this.forceUpdate();
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item}) => {
		const {artist, title} = item;

		return (
			<Song
				artist={artist}
				songTitle={title}
				showAvatar={false}
				onPress={async () => {
					Action.updateCurrentPlaySong(item);
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
