import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../utils";
import IconButton from "./IconButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function TextInputBottomOption({
	title,
	text,
	onTitleChange,
	onSubmit,
	iconName,
	IconType,
	iconSize,
}) {
	const {
		titleContainer,
		titleStyle,
		inputContentContainer,
		inputContainer,
		inputStyle,
		createBtnStyle,
	} = styles;

	return (
		<View style={{flex: 1}}>
			<View style={titleContainer}>
				<Text style={titleStyle}>
					{title}
				</Text>
			</View>
			<View style={inputContentContainer}>
				<View style={inputContainer}>
					<TextInput
						placeholder={'Giải trí...'}
						style={inputStyle}
						underlineColorAndroid={colors.grey}
						value={text}
						onChangeText={onTitleChange}
						onSubmitEditing={onSubmit}
					/>
				</View>
				<IconButton
					iconSize={iconSize}
					name={iconName}
					IconType={IconType}
					style={createBtnStyle}
					onPress={onSubmit}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 20,
	},
	titleStyle: {
		fontSize: 20,
		color: 'black',
		textAlign: 'center',
	},
	inputContentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flexGrow: 1,
	},
	inputContainer: {
		paddingHorizontal: 10,
		flexGrow: 1,
	},
	inputStyle: {
		fontSize: 16,
		color: 'black',
	},
	createBtnStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
});
