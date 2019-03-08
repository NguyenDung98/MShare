import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

export default function Avatar({uri, width}) {
    return (
        <View style={styles.container}>
            {uri ? (
                <Image
                    source={{uri}}
                    style={styles.imageStyle(width)}
                />
            ) : (
                <View style={styles.imageStyle(width)}>
                    <FontAwesome
                        name={'music'}
                        color={'grey'}
                        size={width * 3 / 4}
                    />
                </View>
            )}
            <AntDesign
                name={"play"}
                size={width / 2}
                style={styles.iconStyle(width)}
            />
        </View>
    )
}

Avatar.propTypes = {
    uri: PropTypes.string,
    width: PropTypes.number,
};

Avatar.defaultProps = {
    uri: '',
    width: 60
};

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        borderColor: colors.grey,
    },
    imageStyle: width => ({
        width,
        aspectRatio: 1,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    iconStyle: width => ({
        color: colors.brightRed,
        ...StyleSheet.absoluteFillObject,
        top: width / 4,
        left: width / 4,
        backgroundColor: 'white',
        width: width / 2,
        height: width / 2,
        borderRadius: width / 4,
    }),
});