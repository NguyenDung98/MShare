import React from 'react';
import TrackPlayer from 'react-native-track-player';
import {StyleSheet, Text, View} from "react-native";
import Slider from "react-native-slider";

import {colors, secondsToHuman } from "../utils";

export default class Progress extends TrackPlayer.ProgressComponent {
    _seekToPosition = async value => {
        await TrackPlayer.seekTo(value);
    };

    render() {
        const {position, duration} = this.state;

        return (
            <View>
                <View style={styles.timingContainer}>
                    <Text>{secondsToHuman(position)}</Text>
                    <Text>{secondsToHuman(duration)}</Text>
                </View>
                <Slider
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor={colors.brightRed}
                    maximumTrackTintColor={colors.grey}
                    value={position}
                    maximumValue={duration}
                    onSlidingComplete={this._seekToPosition}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thumb: {
        width: 10,
        height: 10,
        backgroundColor: colors.brightRed,
        borderRadius: 10 / 2,
    },
});