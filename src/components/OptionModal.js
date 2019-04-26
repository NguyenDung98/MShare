import React from 'react';
import {Animated, Modal, TouchableWithoutFeedback, StyleSheet, View} from "react-native";
import {colors} from "../utils";

export default function OptionModal({
    visible,
    toggleModal,
    inputBoxPosition,
	overlayOpacity,
	children,
	boxHeight,
}) {
	const {
		container,
		overlayStyle,
	} = styles;
	const createViewStyle = {
		...StyleSheet.absoluteFillObject,
		bottom: -boxHeight,
		height: boxHeight,
		backgroundColor: colors.white,
	};

	return (
		<Modal
			visible={visible}
			onRequestClose={toggleModal}
			transparent
			animationType={'none'}
		>
			<View style={container}>
				<TouchableWithoutFeedback onPress={toggleModal}>
					<Animated.View style={{...overlayStyle, opacity: overlayOpacity}}/>
				</TouchableWithoutFeedback>
				<Animated.View
					style={{
						...createViewStyle,
						transform: [{translateY: inputBoxPosition}]
					}}
				>
					{children}
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column-reverse',
	},
	overlayStyle: {
		flex: 1,
		backgroundColor: 'black',
	},
});
