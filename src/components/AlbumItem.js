import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import Button from "./Button";
import Ionicons from "react-native-vector-icons/Ionicons";

import {colors} from "../utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AlbumArtist from "./SongArtist";

const MARGIN = 18;
const ARTWORK_SIZE = (Dimensions.get('screen').width - (MARGIN * 3)) * 0.5;

export default function AlbumItem({item, index, onPress}) {
	const style = {
		marginTop: index / 2 < 1 ? MARGIN : MARGIN / 2,
		marginLeft: index % 2 === 0 ? MARGIN : MARGIN / 2,
		marginRight: index % 2 === 0 ? MARGIN / 2 : MARGIN,
		marginBottom: MARGIN / 2,
	};

	const {
		imageStyle,
		overlayStyle,
		moreBtnStyle,
		albumInfoStyle,
		albumArtistStyle,
		favoriteBtnStyle,
	} = styles;

	const {artwork, title, artist} = item;

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={style}>
				{artwork ? (
					<Image
						source={{uri: artwork}}
						style={imageStyle}
					/>
				) : (
					<View style={imageStyle}>
						<FontAwesome
							name={'music'}
							color={colors.grey}
							size={ARTWORK_SIZE * 3 / 4}
						/>
					</View>
				)}
				<View style={overlayStyle}>
					<Button
						style={moreBtnStyle}
						IconType={Ionicons}
						name={'md-more'}
						iconSize={30}
						color={'black'}
					/>
					<View style={albumInfoStyle}>
						<AlbumArtist
							artist={artist}
							artistSize={11}
							songTitle={title}
							songSize={13}
							songColor={'black'}
							wrapperStyle={albumArtistStyle}
						/>
						<Button
							style={favoriteBtnStyle}
							IconType={Ionicons}
							name={'ios-heart-empty'}
							iconSize={30}
							// color={colors.brightRed}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	imageStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		aspectRatio: 1.3,
		width: ARTWORK_SIZE,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.lightGrey,
	},
	overlayStyle: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.transparent,
	},
	moreBtnStyle: {
		width: 30,
		position: 'absolute',
		right: 0,
		opacity: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	albumInfoStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		height: '40%',
		width: '100%',
		backgroundColor: colors.white,
		opacity: 0.85,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.lighterGrey,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
	},
	albumArtistStyle: {
		marginLeft: 5,
		flexBasis: '80%',
	},
	favoriteBtnStyle: {
		width: 30,
		position: 'absolute',
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
