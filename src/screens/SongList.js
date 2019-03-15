import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, FlatList} from "react-native";
import Song from "../components/Song";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import {colors, SONG_ITEM_WIDTH, SONG_MARGIN} from "../utils";
import {takeAudioMetaData} from "../utils/";
import {removeEndFile} from "../utils/TextUtils";

const keyExtractor = item => item.id;

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class SongList extends Component {
    loading = false;
    cursor = null;
    itemHeight = SONG_ITEM_WIDTH + SONG_MARGIN * 2;

    state = {
        songs: []
    };

    async componentDidMount() {
        this._getAudios();
    }

    _getAudios = async (after) => {
	    if (this.loading) return;

	    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

	    if (status !== 'granted') {
		    console.log("Camera roll permissions denied");
		    return;
	    }

	    const results = await MediaLibrary.getAssetsAsync({
		    first: 20,
		    mediaType: "audio",
		    sortBy: "id",
		    after,
	    });

	    const {assets, endCursor, hasNextPage} = results;
	    const songs = await takeAudioMetaData(assets);

	    this.setState(prevState => ({
		    songs: [...prevState.songs, ...songs]
	    }), () => {
		    this.loading = false;
		    this.cursor = hasNextPage ? endCursor : null;
	    })
    };

    _getItemLayout = (data, index) => {
        return {
        	length: this.itemHeight,
	        offset: this.itemHeight * index,
	        index,
        }
    };

    _renderItem = ({item}) => {
	    return (
    		<Song
			    artist={item.artist ? item.artist : 'Unknown artist'}
			    song={item.title ? item.title : removeEndFile(item.filename)}
			    onPress={() => {
					console.log("=================>")
					console.log(item);
					this.props.navigation.navigate("Playing", {
						id: item.id,
						uri : item.uri,
						duration : item.duration,
						albumArtist: item.albumArtist,
						artist: item.artist,
						title: item.title,
						filename : item.filenam,
					})}}
		    />
	    )
    };

    render() {
    	const initialNumToRender = Math.round(SCREEN_HEIGHT / this.itemHeight);

	    return (
            <View style={styles.container}>
                <FlatList
	                keyExtractor={keyExtractor}
                    data={this.state.songs}
                    renderItem={this._renderItem}
                    onEndReached={() => this._getAudios(this.cursor)}
	                getItemLayout={this._getItemLayout}
	                removeClippedSubviews
	                // showsVerticalScrollIndicator={false}
	                initialNumToRender={initialNumToRender}
	                // windowSize={11}
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
