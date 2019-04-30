import React from 'react';

import { View, StyleSheet, Text, Image } from 'react-native';
import Song from './Song';
import { SCALE_RATIO } from '../constants/constants';


export const ItemNewsfeed = ({
    item = {}
}) => {
    console.log(item)
    const { name, uri, online, listening } = item

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image source={{ uri: uri }} style={styles.avt} />
                {/* This for item online */}
                <Text>{name}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20 *SCALE_RATIO, 
        marginRight: 20 *SCALE_RATIO, 
        marginTop: 20*SCALE_RATIO,
        backgroundColor : '#fff', 
        borderRadius : 0.5,
    },
    avt: {
        // flex: 1/6,
        width: 80 * SCALE_RATIO,
        height: 80 * SCALE_RATIO,
        borderRadius: 50, 
        backgroundColor : 'pink'
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },

})