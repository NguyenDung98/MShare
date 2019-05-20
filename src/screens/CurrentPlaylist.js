import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Song from "../components/Song";
import Ionicons from "react-native-vector-icons/Ionicons";

import {colors, playSong} from "../utils";
import store from "../store";
import * as Action from "../actions";

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

	_removeFromPlaylist = async (index) => {
		await Action.removeFromCurrentPlaylist(index);
	};

	_renderItem = ({item, index}) => {
		const {artist, title} = item;
		const {currentPlaySongIndex} = store.getState();

		if (currentPlaySongIndex === index) {
			return (
				<Song
					showAvatar={false}
					title={title}
					subTitle={artist}
					subTitleColor={colors.brighterRed}
					titleColor={colors.brightRed}
					onPress={async () => await playSong(item)}
					buttonIconName={'ios-trash'}
					buttonIconType={Ionicons}
					onButtonPress={async () => await this._removeFromPlaylist(index)}
				/>
			)
		}

		return (
			<Song
				showAvatar={false}
				subTitle={artist}
				title={title}
				onPress={async () => await playSong(item)}
				buttonIconName={'ios-trash'}
				buttonIconType={Ionicons}
				onButtonPress={() => this._removeFromPlaylist(index)}
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
