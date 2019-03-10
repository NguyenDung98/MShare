import React from 'react';
import {TouchableOpacity, StyleSheet, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "./Button";
import {colors} from "../utils";

const BUTTON_SIZE = 70;

export default function PlayingButtons({playing, onPlayTogglePress}) {
    const {
        buttonsContainer,
        playButtonsContainer,
        skipBtn,
        playBtn,
    } = styles;

    return (
        <View style={buttonsContainer}>
            <Button
                name={'ios-repeat'}
                size={BUTTON_SIZE / 2}
                color={colors.brightRed}
                IconType={Ionicons}
                ButtonType={TouchableOpacity}
            />
            <View style={playButtonsContainer}>
                <Button
                    style={skipBtn}
                    name={'ios-skip-backward'}
                    size={BUTTON_SIZE / 3.5}
                    color={colors.brightRed}
                    IconType={Ionicons}
                    ButtonType={TouchableOpacity}
                />
                <Button
                    style={playBtn}
                    name={playing ? 'ios-pause' : 'ios-play'}
                    size={BUTTON_SIZE / 2}
                    color={colors.white}
                    onPress={onPlayTogglePress}
                    IconType={Ionicons}
                    ButtonType={TouchableOpacity}
                />
                <Button
                    style={skipBtn}
                    name={'ios-skip-forward'}
                    size={BUTTON_SIZE / 3.5}
                    color={colors.brightRed}
                    IconType={Ionicons}
                    ButtonType={TouchableOpacity}
                />
            </View>
            <Button
                name={'ios-shuffle'}
                size={35}
                color={colors.brightRed}
                IconType={Ionicons}
                ButtonType={TouchableOpacity}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    playButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 30
    },
    skipBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: BUTTON_SIZE / 2,
        height: BUTTON_SIZE / 2,
        borderRadius: BUTTON_SIZE / 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.brightRed,
    },
    playBtn: {
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        borderWidth: 9,
        borderColor: colors.lightGrey,
        backgroundColor: colors.brightRed,
        marginLeft: 20,
        marginRight: 20,
    },
});