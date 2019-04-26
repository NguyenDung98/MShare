import React from 'react';
import {StyleSheet, Image, Text, TouchableNativeFeedback, View, StatusBar, Animated} from "react-native";
import {AVATAR_MARGIN_LEFT, AVATAR_SIZE, colors, SCREEN_HEIGHT} from "../utils";
import IconButton from "./IconButton";
import Ionicons from "react-native-vector-icons/Ionicons";

const BACK_BUTTON_SIZE = 40;

export default function CollectionDetailHeader({
	image,
	title,
	type,
	songs,
	goBack,
	onLayout,
	customTitleStyle,
	customTitleContainerStyle,
}) {
	const {
		overlayStyle,
		backBtnStyle,
		textContainerStyle,
		titleStyle,
		subTitleStyle,
	} = styles;

	return (
		<View>
			<Image
				source={{uri: image}}
				style={{height: SCREEN_HEIGHT * 0.3, width: '100%'}}
				resizeMode={'cover'}
			/>
			<View style={overlayStyle}>
				<IconButton
					name={'ios-arrow-round-back'}
					IconType={Ionicons}
					iconSize={BACK_BUTTON_SIZE}
					ButtonType={TouchableNativeFeedback}
					style={backBtnStyle}
					buttonProps={{
						background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
					}}
					color={colors.white}
					onPress={() => goBack()}
				/>
				<View style={{...textContainerStyle, ...customTitleContainerStyle}}>
					<Animated.Text
						style={{...titleStyle, ...customTitleStyle}}
						onLayout={onLayout}
						numberOfLines={1}
					>
						{title}
					</Animated.Text>
					<Text style={subTitleStyle}>
						{type}    |    {songs} bài hát
					</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayStyle: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.brightRed,
		opacity: 0.8,
		height: SCREEN_HEIGHT * 0.3,
	},
	backBtnStyle: {
		marginTop: StatusBar.currentHeight * 0.8,
		marginLeft: 10,
		width: BACK_BUTTON_SIZE * 0.7,
		height: BACK_BUTTON_SIZE * 0.7,
		borderRadius: BACK_BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainerStyle: {
		position: 'absolute',
		bottom: 10,
		left: AVATAR_SIZE + AVATAR_MARGIN_LEFT + 5,
		overflow: 'hidden'
	},
	titleStyle: {
		fontSize: 25,
		color: colors.white,
		fontWeight: '700',
	},
	subTitleStyle: {
		fontSize: 15,
		color: colors.white
	},
});
