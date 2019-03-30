import React from 'react';
import TrackPlayer from 'react-native-track-player';
import {StyleSheet, Text, View} from "react-native";
import Slider from "react-native-slider";

import {colors, secondsToHuman} from "../utils";

export default class Progress extends TrackPlayer.ProgressComponent {
	state = {
		isSliding: false,
	};

	shouldComponentUpdate() {
		return !this.state.isSliding;
	};

	_onValueChange = () => {
		this.setState({
			isSliding: true
		})
	};

	_seekToPosition = async value => {
		this.setState({
			isSliding: false
		});
		await TrackPlayer.seekTo(value);
	};

	render() {
		const {lightGrey, grey, brightRed, transparent} = colors;
		const {position, duration, bufferedPosition} = this.state;
		const {
			timingContainer,
			invisibleThumb,
			thumb,
			bufferedProgress,
			currentProgress,
			maximumProgress
		} = styles;

		return (
			<View>
				<View style={timingContainer}>
					<Text>{secondsToHuman(position)}</Text>
					<Text>{secondsToHuman(duration)}</Text>
				</View>
				<Slider
					style={maximumProgress}
					thumbStyle={invisibleThumb}
					minimumTrackTintColor={transparent}
					maximumTrackTintColor={lightGrey}
					value={0}
					maximumValue={duration}
				/>
				<Slider
					style={bufferedProgress}
					thumbStyle={invisibleThumb}
					minimumTrackTintColor={grey}
					maximumTrackTintColor={transparent}
					value={bufferedPosition}
					maximumValue={duration}
				/>
				<Slider
					style={currentProgress}
					thumbStyle={thumb}
					minimumTrackTintColor={brightRed}
					maximumTrackTintColor={transparent}
					value={position}
					maximumValue={duration}
					onValueChange={this._onValueChange}
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
	invisibleThumb: {
		width: 0,
		height: 0,
	},
	bufferedProgress: {
		zIndex: 1,
		...StyleSheet.absoluteFill,
		top: 19
	},
	currentProgress: {
		zIndex: 2,
		...StyleSheet.absoluteFill,
		top: 19
	},
	maximumProgress: {
		zIndex: 0
	}
});
