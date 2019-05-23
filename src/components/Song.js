import React from 'react';
import {ColorPropType, TouchableNativeFeedback, TouchableWithoutFeedback, StyleSheet, View, ViewPropTypes} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Avatar from "./Avatar";
import SongArtist from "./SongArtist";
import IconButton from "./IconButton";
import PropTypes from 'prop-types';

import {colors, SONG_ITEM_WIDTH, SONG_PADDING} from "../utils/";

export default class Song extends React.PureComponent {
	static propTypes = {
		uri: PropTypes.string,
		title: PropTypes.string,
		titleColor: ColorPropType,
		subTitle: PropTypes.any,
		subTitleColor: ColorPropType,
		onPress: PropTypes.func,
		showAvatar: PropTypes.bool,
		showOverlayIcon: PropTypes.bool,
		showAlternativeIcon: PropTypes.bool,
		showBadge: PropTypes.bool,
		avatarIconName: PropTypes.string,
		avatarIconType: PropTypes.any,
		avatarIconWidth: PropTypes.number,
		onButtonPress: PropTypes.func,
		showMoreButton: PropTypes.bool,
		buttonType: PropTypes.any,
		buttonIconName: PropTypes.string,
		buttonIconType: PropTypes.any,
		imageStyle: ViewPropTypes.style,
		showProgress: PropTypes.bool,
		progress: PropTypes.number,
	};

	static defaultProps = {
		uri: '',
		onPress: null,
		showAvatar: true,
		showOverlayIcon: false,
		avatarIconWidth: SONG_ITEM_WIDTH,
		buttonIconName: 'md-more',
		buttonIconType: Ionicons,
		showMoreButton: true,
		showProgress: false,
	};

	render() {
		const {
			uri,
			showOverlayIcon,
			showAlternativeIcon,
			showAvatar,
			showBadge,
			title,
			subTitle,
			onPress,
			titleColor,
			subTitleColor,
			avatarIconName,
			avatarIconType,
			avatarIconWidth,
			onButtonPress,
			buttonType,
			buttonIconName,
			buttonIconType,
			showMoreButton,
			showProgress,
			progress,
			imageStyle
		} = this.props;
		let WrapperComponent = onPress ?  TouchableNativeFeedback : TouchableWithoutFeedback;
		return (
			<WrapperComponent onPress={onPress}>
				<View style={styles.container}>
					{showAvatar && (
						<Avatar
							uri={uri}
							width={avatarIconWidth}
							showOverlayIcon={showOverlayIcon}
							IconType={avatarIconType}
							iconName={avatarIconName}
							imageStyle={imageStyle}
							showAlternativeIcon={showAlternativeIcon}
							showBadge={showBadge}
						/>
					)}
					<SongArtist
						songTitle={title}
						artist={subTitle}
						wrapperStyle={styles.songArtist}
						songColor={titleColor}
						artistColor={subTitleColor}
						showProgress={showProgress}
						progress={progress}
					/>
					{showMoreButton && (
						<IconButton
							onPress={onButtonPress}
							ButtonType={buttonType}
							style={styles.moreBtnStyle}
							IconType={buttonIconType}
							name={buttonIconName}
							iconSize={30}
							color={colors.grey}
						/>
					)}
				</View>
			</WrapperComponent>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        paddingTop: SONG_PADDING,
        paddingBottom: SONG_PADDING,
        alignItems: 'center',
	    flex: 1,
    },
    songArtist: {
        flexGrow: 1,
        marginLeft: 10,
	    flexBasis: '70%',
	    justifyContent: 'center',
    },
    moreBtnStyle: {
        width: 30,
        alignItems: 'center',
    }
});
