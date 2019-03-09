import React from 'react';
import {TouchableNativeFeedback, TouchableOpacity, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from "./Avatar";
import SongAuthor from "./SongAuthor";
import PropTypes from 'prop-types';
import colors from "../utils/colors";

export default function Song({uri, song, authorName}) {
    return (
        <TouchableNativeFeedback onPress={() => alert('hi')}>
            <View style={styles.container}>
                <Avatar uri={uri} width={65}/>
                <SongAuthor
                    song={song}
                    authorName={authorName}
                    wrapperStyle={styles.songAuthor}
                />
                <TouchableOpacity onPress={() => alert('hello')} style={styles.moreBtnStyle}>
                    <Ionicons
                        name={'md-more'}
                        size={30}
                        color={colors.grey}
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
    moreBtnStyle: {
        width: 20,
        alignItems: 'center'
    }
});