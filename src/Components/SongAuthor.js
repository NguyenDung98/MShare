import React from "react";
import {ViewPropTypes, StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export default function SongAuthor({authorName, song, authorSize, songSize, wrapperStyle}) {
    return (
        <View style={wrapperStyle}>
            <Text style={styles.song(songSize)}>{song}</Text>
            <Text style={styles.author(authorSize)}>{authorName}</Text>
        </View>
    );
}

SongAuthor.propTypes = {
    authorName: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
    authorSize: PropTypes.number,
    songSize: PropTypes.number,
    wrapperStyle: ViewPropTypes.style,
};

SongAuthor.defaultProps = {
    authorSize: 14,
    songSize: 18,
    wrapperStyle: {}
};

const styles = StyleSheet.create({
    song: songSize => ({
        fontSize: songSize,
        color: 'black'
    }),
    author: authorSize =>  ({
        fontSize: authorSize,
    }),
});