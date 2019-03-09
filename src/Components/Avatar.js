import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

export default function Avatar({uri, width, showPlayButton, elevation}) {
    return (
        <View style={styles.container(elevation)}>
            {uri ? (
                <Image
                    source={{uri}}
                    style={styles.imageStyle(width)}
                />
            ) : (
                <View style={styles.imageStyle(width)}>
                    <FontAwesome
                        name={'music'}
                        color={colors.grey}
                        size={width * 3 / 4}
                    />
                </View>
            )}
            {showPlayButton &&
            <AntDesign
                name={"play"}
                size={width / 2}
                style={styles.iconStyle(width)}
            />}
        </View>
    )
}

Avatar.propTypes = {
    uri: PropTypes.string,
    width: PropTypes.number,
    showPlayButton: PropTypes.bool,
    elevation: PropTypes.number,
};

Avatar.defaultProps = {
    uri: '',
    width: 60,
    showPlayButton: false,
    elevation: 1,
};

const styles = StyleSheet.create({
    container: elevation => ({
        elevation,
        borderColor: colors.lightGrey,
        borderRadius: 5,
    }),
    imageStyle: width => ({
        width,
        aspectRatio: 1,
        backgroundColor: colors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }),
    iconStyle: width => ({
        color: colors.brightRed,
        ...StyleSheet.absoluteFillObject,
        top: width / 4,
        left: width / 4,
        backgroundColor: colors.white,
        width: width / 2,
        height: width / 2,
        borderRadius: width / 4,
    }),
});