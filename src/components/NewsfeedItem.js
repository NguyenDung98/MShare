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
                <Text style={styles.name}>{name}</Text>
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
        borderWidth: 1,
        backgroundColor : 'pink'
    },
    avt: {
        // flex: 1/6,
        width: 80 * SCALE_RATIO,
        height: 80 * SCALE_RATIO,
        borderRadius: 50, 
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
    },
    name : {
        justifyContent : 'center',
        alignItems: 'center',
        fontSize: 16,
    }

})