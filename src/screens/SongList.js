import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from "react-native";
import Song from "../components/Song";

import {colors, ITEM_HEIGHT, numOfFirstItems, playSong} from "../utils";
import store from "../store";
import * as Action from "../actions";

const keyExtractor = item => item.id;

export default class SongList extends Component {
	static navigationOptions = {
		tabBarLabel: "Danh sách nhạc"
	};

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

	_renderItem = ({item}) => {
		const {artwork, artist, title} = item;

		return (
			<Song
				uri={artwork}
				artist={artist}
				songTitle={title}
				onPress={() => playSong(item)}
			/>
		)
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={keyExtractor}
					data={store.getState().loadedSongs}
					renderItem={this._renderItem}
					onEndReached={this._loadAudios}
					getItemLayout={this._getItemLayout}
					removeClippedSubviews
					showsVerticalScrollIndicator={false}
					initialNumToRender={numOfFirstItems}
					windowSize={11}
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
