import React from 'react';
import {ViewPropTypes, StyleSheet, Image, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {colors} from '../utils';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Avatar({imageStyle, uri, width, showOverlayIcon, showAlternativeIcon, elevation, iconName, IconType}) {
    return (
        <View style={styles.container(elevation, imageStyle)}>
            {uri ? (
                <Image
                    source={{uri}}
                    style={styles.imageStyle(width, imageStyle)}
                />
            ) : (
                <View style={styles.imageStyle(width, imageStyle)}>
                    {showAlternativeIcon && (<IconType
                        name={iconName}
                        color={colors.grey}
                        size={width * 3 / 4}
                    />)}
                </View>
            )}
            {showOverlayIcon &&
                <View style={styles.iconStyle(width)}>
	                <Ionicons
		                name={"ios-add-circle"}
		                size={width / 2}
                        color={colors.brightRed}
	                />
                </View>}
        </View>
    )
}

Avatar.propTypes = {
    uri: PropTypes.string,
    width: PropTypes.number,
    showOverlayIcon: PropTypes.bool,
	showAlternativeIcon: PropTypes.bool,
	elevation: PropTypes.number,
	imageStyle: ViewPropTypes.style,
	iconName: PropTypes.string,
	IconType: PropTypes.any,
};

Avatar.defaultProps = {
    uri: '',
    width: 60,
	showOverlayIcon: false,
	showAlternativeIcon: true,
    elevation: 1,
    imageStyle: {},
	iconName: 'music',
	IconType: FontAwesome,
};

const styles = StyleSheet.create({
    container: (elevation, imageStyle) => ({
        elevation,
        borderColor: colors.lightGrey,
        borderRadius: 5,
        ...imageStyle
    }),
    imageStyle: (width, imageStyle) => ({
        width,
        aspectRatio: 1,
        backgroundColor: colors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        ...imageStyle
    }),
    iconStyle: width => ({
        ...StyleSheet.absoluteFillObject,
        top: width / 4,
        left: width / 3,
        // backgroundColor: colors.white,
        width: width / 2,
        height: width / 2,
        borderRadius: width / 4,
    }),
});
