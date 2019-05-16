import React from "react";
import {ColorPropType, ViewPropTypes, StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export default function SongArtist({
    artist,
    songTitle,
    artistSize,
    songSize,
    songColor,
    artistColor,
    wrapperStyle,
}) {
    return (
        <View style={wrapperStyle}>
            <Text
                style={styles.songTitle(songSize, songColor)}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {songTitle}
            </Text>
            {artist && (
	            <Text
		            style={styles.artist(artistSize, artistColor)}
		            numberOfLines={1}
		            ellipsizeMode={'tail'}
	            >
		            {artist}
	            </Text>
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
};

SongArtist.defaultProps = {
	artistSize: 13,
    songSize: 17,
    wrapperStyle: {},
    songColor: 'black',
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
});
