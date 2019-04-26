import React from 'react';
import {StyleSheet, View} from "react-native";
import Avatar from "./Avatar";
import IconButton from "./IconButton";
import {AVATAR_MARGIN_LEFT, AVATAR_SIZE, colors, WIDGET_BUTTON_SIZE} from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function CollectionDetailWidget({image}) {
	const {
		avatarContainerStyle,
		avatarStyle,
		widgetBtnContainerStyle,
		widgetBtnStyle,
	} = styles;

	return (
		<View style={avatarContainerStyle}>
			<Avatar
				imageStyle={avatarStyle}
				width={AVATAR_SIZE}
				uri={image}
				elevation={2}
			/>
			<View style={widgetBtnContainerStyle}>
				<IconButton
					name={'ios-shuffle'}
					color={colors.grey}
					iconSize={WIDGET_BUTTON_SIZE}
					IconType={Ionicons}
					style={widgetBtnStyle(WIDGET_BUTTON_SIZE)}
				/>
				<IconButton
					name={'ios-play'}
					color={colors.brightRed}
					iconSize={WIDGET_BUTTON_SIZE * 1.5}
					IconType={Ionicons}
					style={widgetBtnStyle(WIDGET_BUTTON_SIZE * 1.5)}
				/>
				<IconButton
					name={'repeat'}
					color={colors.grey}
					iconSize={WIDGET_BUTTON_SIZE}
					IconType={MaterialCommunityIcons}
					style={widgetBtnStyle(WIDGET_BUTTON_SIZE)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	avatarContainerStyle: {
		left: AVATAR_MARGIN_LEFT,
		top: -AVATAR_SIZE * 0.55,
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
	},
	avatarStyle: {
		borderRadius: AVATAR_SIZE / 2,
	},
	widgetBtnContainerStyle: {
		flexDirection: 'row',
		position: 'absolute',
		right: - (AVATAR_SIZE + AVATAR_MARGIN_LEFT) + 10,
		bottom: 0,
		alignItems: 'center',
	},
	widgetBtnStyle: size => ({
		width: size,
		height: size,
		alignItems: 'center',
		justifyContent: 'center',
	}),
});
