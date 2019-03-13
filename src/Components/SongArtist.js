import React from "react";
import {ViewPropTypes, StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export default function SongArtist({artist, song, artistSize, songSize, wrapperStyle}) {
    return (
        <View style={wrapperStyle}>
            <Text
                style={styles.song(songSize)}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {song}
            </Text>
            <Text style={styles.artist(artistSize)}>{artist}</Text>
        </View>
    );
}

SongArtist.propTypes = {
    artist: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
    artistSize: PropTypes.number,
    songSize: PropTypes.number,
    wrapperStyle: ViewPropTypes.style,
};

SongArtist.defaultProps = {
	artistSize: 14,
    songSize: 18,
    wrapperStyle: {}
};

const styles = StyleSheet.create({
    song: songSize => ({
        fontSize: songSize,
        color: 'black',
    }),
    artist: artistSize =>  ({
        fontSize: artistSize,
    }),
});
