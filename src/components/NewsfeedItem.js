import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Song from './Song';
import { SCALE_RATIO } from '../constants/constants';
import Icon from 'react-native-vector-icons/Feather';



export const ItemNewsfeed = ({
    item = {}
}) => {
    console.log(item)
    const { name, uri, time } = item.user;
    const { artwork, artist, title } = item.item;

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image source={{ uri: uri }} style={styles.avt} />
                <View />
            </View>
            <View style={styles.container3}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.container4}>
                    <Text style={styles.music} numberOfLines={1}>{time}</Text>
                </View>
                <TouchableOpacity style={styles.tabmusic}>
                    <Song
                        uri={artwork}
                        subTitle={artist}
                        showMoreButton={false}
                        title={title}
                        onPress={() => playSong(item)}
                        style={{ paddingBottom: 10 }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20 * SCALE_RATIO,
        marginLeft: 25 * SCALE_RATIO,
        marginBottom: 20 * SCALE_RATIO,
        marginRight: 25 * SCALE_RATIO,
        paddingBottom: 8 * SCALE_RATIO,
        borderColor: '#f2f2f2',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 20 * SCALE_RATIO,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2
    },
    avt: {
        width: 80 * SCALE_RATIO,
        height: 80 * SCALE_RATIO,
        borderRadius: 50,
    },
    container2: {
        flexDirection: 'column',
    },


    name: {
        fontSize: 17,
        color: 'black',
    },
    music: {
        fontSize: 11,
        color: 'gray',
        width: 480 * SCALE_RATIO,
    },
    container3: {
        flex: 1,
        marginLeft: 20 * SCALE_RATIO,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container4: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container5: {
        flexDirection: 'row'
    },
    play: {
        flex: 1 / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabmusic: {
        marginTop: 30 * SCALE_RATIO,
        marginLeft: -85 * SCALE_RATIO,
        margin: 20 * SCALE_RATIO,
        borderWidth: 1,
        borderColor: '#f2f2f2',
    }
})