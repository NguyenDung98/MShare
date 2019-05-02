import React from 'react';

import { View, StyleSheet, Text, Image } from 'react-native';
import Song from './Song';
import { SCALE_RATIO } from '../constants/constants';
import { colors } from './../utils/colors'



export const ItemFriend = ({
    item = {}
}) => {
    console.log(item)
    const { name, uri, online, listening } = item

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image source={{ uri: uri }} style={styles.avt} />
                {/* This for item online */}
                <View  style={styles.online}/>
            </View>
            <Text>{name}</Text>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20 * SCALE_RATIO,
        marginLeft: 25 * SCALE_RATIO,
        marginBottom: 20 * SCALE_RATIO,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        marginRight: 25 * SCALE_RATIO,
        paddingBottom: 8 * SCALE_RATIO,
        // borderBottomColor: colors.brightRed,
        // borderRightColor: colors.brightRed,
        borderBottomColor : '#f2f2f2',
        borderRightColor : '#f2f2f2',
        borderRadius: 10
    },
    avt: {
        // flex: 1/6,
        width: 100 * SCALE_RATIO,
        height: 100 * SCALE_RATIO,
        borderRadius: 50,
    },
    container2: {
        flex: 1,
        flexDirection: 'column',
    },

    online : {
        flex: 1,
        width: 30 * SCALE_RATIO,
        height : 30 * SCALE_RATIO,
        borderRadius : 50,
        borderWidth: 5 * SCALE_RATIO,
        borderColor: 'white',
        backgroundColor : '#17c603', 
        marginTop : -30 * SCALE_RATIO, 
        marginLeft : 70 * SCALE_RATIO

    }
})