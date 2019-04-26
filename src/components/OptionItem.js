import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import IconButton from "./IconButton";

export default function OptionItem({iconName, IconType, title, onPress, iconSize}) {
	const {optionContainerStyle, optionTextStyle} = styles;

	return (
		<TouchableNativeFeedback onPress={onPress}>
			<View style={optionContainerStyle}>
				<IconButton
					IconType={IconType}
					name={iconName}
					iconSize={iconSize}
					style={{
						width: iconSize,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					buttonProps={{
						disabled: true
					}}
				/>
				<View>
					<Text style={optionTextStyle}>{title}</Text>
				</View>
			</View>
		</TouchableNativeFeedback>
	)
}

const styles = StyleSheet.create({
	optionContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 15,
		paddingVertical: 5,
	},
	optionTextStyle: {
		fontSize: 16,
		color: 'black',
		marginLeft: 20
	},
});
