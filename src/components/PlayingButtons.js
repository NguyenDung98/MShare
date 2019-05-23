import React from 'react';
import {StyleSheet, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconButton from "./IconButton";
import {colors, REPEAT_STATE, skipToNext, skipToPrevious} from "../utils";

const BUTTON_SIZE = 70;
const repeatIcons = {
	repeat: 'repeat',
	repeatOnce: 'repeat-once'
};

export default function PlayingButtons({
    playing,
    onPlayTogglePress,
    onRepeatTogglePress,
    repeatState,
    onShuffleTogglePress,
	shuffleState,
}) {
	const {
		buttonsContainer,
		playButtonsContainer,
		skipBtn,
		playBtn,
	} = styles;
	let repeatIcon;

	switch (repeatState) {
		case REPEAT_STATE.all:
		case REPEAT_STATE.off:
			repeatIcon = repeatIcons.repeat;
			break;
		case REPEAT_STATE.one:
			repeatIcon = repeatIcons.repeatOnce;
			break;
	}

	return (
		<View style={buttonsContainer}>
			<IconButton
				name={repeatIcon}
				iconSize={BUTTON_SIZE / 2}
				color={repeatState === REPEAT_STATE.off ? colors.grey : colors.mainColor}
				IconType={MaterialCommunityIcons}
				onPress={onRepeatTogglePress}
			/>
			<View style={playButtonsContainer}>
				<IconButton
					style={skipBtn}
					name={'ios-skip-backward'}
					iconSize={BUTTON_SIZE / 3.5}
					color={colors.mainColor}
					IconType={Ionicons}
					onPress={skipToPrevious}
				/>
				<IconButton
					style={playBtn}
					name={playing ? 'ios-pause' : 'ios-play'}
					iconSize={BUTTON_SIZE / 2}
					color={colors.white}
					onPress={onPlayTogglePress}
					IconType={Ionicons}
				/>
				<IconButton
					style={skipBtn}
					name={'ios-skip-forward'}
					iconSize={BUTTON_SIZE / 3.5}
					color={colors.mainColor}
					IconType={Ionicons}
					onPress={skipToNext}
				/>
			</View>
			<IconButton
				name={'ios-shuffle'}
				iconSize={35}
				color={shuffleState ? colors.mainColor : colors.grey}
				IconType={Ionicons}
				onPress={onShuffleTogglePress}
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
		borderColor: colors.mainColor,
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
		backgroundColor: colors.mainColor,
		marginLeft: 20,
		marginRight: 20,
	},
});
