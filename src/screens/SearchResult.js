import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import SearchHeader from "../components/SearchHeader";
import store from "../store";
import Song from "../components/Song";
import {colors, playSong} from "../utils";

const keyExtractor = item => item.id;

export default class SearchResult extends Component {
	static navigationOptions = ({navigation}) => ({
		header: <SearchHeader navigation={navigation}/>
	});

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

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
					data={store.getState().searchedSongs}
					renderItem={this._renderItem}
					// getItemLayout={this._getItemLayout}
					removeClippedSubviews
					showsVerticalScrollIndicator={false}
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
