import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import Song from "../Components/Song";
import colors from "../utils/colors";

export default class PlayList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Song
                    uri={'https://picsum.photos/600/600'}
                    song={'Breathin'}
                    authorName={'Ariana Grande'}
                />
                <Song
                    uri={'https://picsum.photos/600/600'}
                    song={'Breathin'}
                    authorName={'Ariana Grande'}
                />
                <Song
                    song={'Breathin'}
                    authorName={'Ariana Grande'}
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