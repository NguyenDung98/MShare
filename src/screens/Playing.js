import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from "../Components/Avatar";
import SongAuthor from "../Components/SongAuthor";
import PlayingWidget from "../Components/PlayingWidget";
import colors from "../utils/colors";

export default class Playing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.nowPlaying}>NOW PLAYING</Text>
                <Avatar
                    uri={'https://picsum.photos/600/600'}
                    width={250}
                    elevation={30}
                />
                <SongAuthor
                    song={'Breathin Breathin'}
                    authorName={'Ariana Grande'}
                    songSize={25}
                    authorSize={18}
                    wrapperStyle={styles.songAuthor}
                />
                <PlayingWidget/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    nowPlaying: {
        color: colors.grey,
        marginBottom: 20,
        letterSpacing: 3,
    },
    songAuthor: {
        alignItems: 'center',
        marginTop: 20
    },
});