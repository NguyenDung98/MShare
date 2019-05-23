import React from "react";
import {ColorPropType, ViewPropTypes, StyleSheet, Text, View} from "react-native";
import Slider from 'react-native-slider';
import PropTypes from "prop-types";
import {colors} from "../utils";

export default function SongArtist({
    artist,
    songTitle,
    artistSize,
    songSize,
    songColor,
    artistColor,
    wrapperStyle,
    showProgress,
    progress,
}) {
    const {invisibleThumb, progressStyle} = styles;

    return (
        <View style={wrapperStyle}>
            <Text
                style={styles.songTitle(songSize, songColor)}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {songTitle}
            </Text>
            {!showProgress && artist && (
	            <Text
		            style={styles.artist(artistSize, artistColor)}
		            numberOfLines={1}
		            ellipsizeMode={'tail'}
	            >
		            {artist}
	            </Text>
            )}
            {showProgress && (
                <View style={progressStyle}>
	                <Slider
		                style={{width: '90%'}}
                        disabled
                        value={progress}
                        maximumValue={100}
                        thumbStyle={invisibleThumb}
		                minimumTrackTintColor={colors.mainColor}
	                />
                    <Text> {progress}%</Text>
                </View>
            )}
        </View>
    );
}

SongArtist.propTypes = {
    artist: PropTypes.any,
    songTitle: PropTypes.string,
    artistSize: PropTypes.number,
    wrapperStyle: ViewPropTypes.style,
	songColor: ColorPropType,
	artistColor: ColorPropType,
	showProgress: PropTypes.bool,
	progress: PropTypes.number,
};

SongArtist.defaultProps = {
	artistSize: 13,
    songSize: 17,
    wrapperStyle: {},
    songColor: 'black',
	showProgress: false,
	progress: 0,
};

const styles = StyleSheet.create({
    songTitle: (songTitleSize, songColor) => ({
        fontSize: songTitleSize,
        color: songColor,
    }),
    artist: (artistSize, artistColor) =>  ({
        fontSize: artistSize,
	    color: artistColor,
    }),
	progressStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
	invisibleThumb: {
		width: 0,
		height: 0,
	},
});
