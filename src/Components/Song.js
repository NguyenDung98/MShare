import React from 'react';
import {TouchableNativeFeedback, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from "./Avatar";
import PropTypes from 'prop-types';
import colors from "../utils/colors";

const SongAuthor = ({authorName, song}) => (
    <View style={styles.songAuthor}>
        <Text style={styles.song}>{song}</Text>
        <Text style={styles.author}>{authorName}</Text>
    </View>
);

SongAuthor.propTypes = {
    authorName: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
};

export default function Song({uri, song, authorName}) {
    return (
        <TouchableNativeFeedback onPress={() => alert('hi')}>
            <View style={styles.container}>
                <Avatar uri={uri} width={65}/>
                <SongAuthor song={song} authorName={authorName}/>
                <TouchableOpacity onPress={() => alert('hello')} style={styles.moreBtnStyle}>
                    <Ionicons
                        name={'md-more'}
                        size={30}
                        color={colors.darkGrey}
                    />
                </TouchableOpacity>
            </View>
        </TouchableNativeFeedback>
    )
}

Song.propTypes = {
    uri: PropTypes.string,
    song: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
};

Song.defaultProps = {
    uri: '',
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 15,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    songAuthor: {
        flexGrow: 1,
        marginLeft: 10,
    },
    author: {
        fontSize: 14,
    },
    song: {
        fontSize: 18,
        color: 'black'
    },
    moreBtnStyle: {
        width: 20,
        alignItems: 'center'
    }
});