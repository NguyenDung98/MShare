import React from "react";
import {ViewPropTypes, StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export default function SongArtist({artist, songTitle, artistSize, songSize, wrapperStyle}) {
    return (
        <View style={wrapperStyle}>
            <Text
                style={styles.songTitle(songSize)}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {songTitle}
            </Text>
            <Text
                style={styles.artist(artistSize)}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {artist}
            </Text>
        </View>
    );

}

SongArtist.propTypes = {
    artist: PropTypes.string.isRequired,
    songTitle: PropTypes.string.isRequired,
    artistSize: PropTypes.number,
    wrapperStyle: ViewPropTypes.style,
};


SongArtist.defaultProps = {
	artistSize: 14,
    songSize: 18,
    wrapperStyle: {}
};

const styles = StyleSheet.create({
    songTitle: songTitleSize => ({
        fontSize: songTitleSize,
        color: 'black',
    }),
    artist: artistSize =>  ({
        fontSize: artistSize,
    }),
});
