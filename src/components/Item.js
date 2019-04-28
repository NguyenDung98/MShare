import React from 'react';

import { View, StyleSheet, Text, Image } from 'react-native';
import Song from './Song';
import { SCALE_RATIO } from '../constants/constants';

const timeLine = require('./../imgs/timeline5.png')


export const ItemTimeLine = ({
    item = {}
}) => {
    console.log(item)
    const { artist, artwork, title } = item.item
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.timeline}>
                    <Image source={timeLine} />
                </View>
                <View style={styles.song}>
                    <Text style={styles.textTime}>{item.time}</Text>
                    <Song
                        uri={artwork}
                        subTitle={artist}
                        title={title}
                        onPress={() => playSong(item)}
                        style= {{paddingBottom: 10}}
                    />
                </View>
            </View>
            <View style={styles.line} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textTime: {
        fontSize: 16,
        // flex : 1,
        // justifyContent : 'flex-end',
        // bottom: 0,
        marginTop: 45 * SCALE_RATIO
    },
    timeline: {
        flex: 0.1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    song: {
        flex: 1,
        justifyContent: 'flex-start', 
        // alignItems : 'center'

    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    line: {
        borderBottomColor: 'orange',
        borderBottomWidth: 0.2,
        marginLeft: 200 * SCALE_RATIO,
        marginRight: 200 * SCALE_RATIO,
        marginTop: -1
    }

})