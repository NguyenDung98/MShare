import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, FlatList} from "react-native";
import Song from "../Components/Song";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import {colors} from "../utils";
import {takeAudioMetaData} from "../utils/";
import {removeEndFile} from "../utils/TextUtils";

const keyExtractor = item => item.id;
const SCREEN_HEIGHT = Dimensions.get('screen');

export default class PlayList extends Component {
    loading = false;
    cursor = null;
    itemHeight = 85;

    state = {
        audios: []
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
	    const audios = await takeAudioMetaData(assets);

	    this.setState(prevState => ({
		    audios: [...prevState.audios, ...audios]
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
			    onPress={() => {}}
		    />
	    )
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
	                keyExtractor={keyExtractor}
                    data={this.state.audios}
                    renderItem={this._renderItem}
                    onEndReached={() => this._getAudios(this.cursor)}
	                getItemLayout={this._getItemLayout}
	                // showsVerticalScrollIndicator={false}
	                // initialNumToRender={SCREEN_HEIGHT / this.itemHeight}
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
