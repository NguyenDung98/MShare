import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from "react-native-slider";
import colors from "../utils/colors";
import PlayingButtons from "./PlayingButtons";

export default class PlayingWidget extends React.Component {
    state = {
        value: 0.2
    };

    render() {
        const {container, timingContainer, thumb} = styles;

        return (
            <View style={container}>
                <View style={timingContainer}>
                    <Text>00:00</Text>
                    <Text>03:33</Text>
                </View>
                <Slider
                    thumbStyle={thumb}
                    minimumTrackTintColor={colors.brightRed}
                />
                <PlayingButtons/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        alignSelf: 'stretch',
    },
    timingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thumb: {
        width: 10,
        height: 10,
        backgroundColor: colors.brightRed,
        borderRadius: 10 / 2,
    }
});