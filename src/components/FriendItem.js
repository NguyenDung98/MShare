import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SCALE_RATIO } from '../constants/constants';
import Icon from 'react-native-vector-icons/Feather';
import Song from "./Song";

export const ItemFriend = ({
    item = {}
}) => {
    const { name, avatarUrl, online, listening } = item;
    if(!online)
        return <View />;
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image source={{ uri: avatarUrl }} style={styles.avt} />
                {/* This for item online */}
                <View style={styles.online} />
                <View />
            </View>
            <View style={styles.container3}>
                <Text style={styles.name}>{name}</Text>
                {listening ?
                    <View style={styles.container4}>
                        <Icon name='music' size={18} />
                        <Text style={styles.music} numberOfLines={1}>{item.item.title} ({item.item.artist})</Text>
                    </View>
                    : <View />
                }
            </View>
            {listening ?
                <TouchableOpacity style={styles.play}>
                    <Icon name='play' size={28} />
                </TouchableOpacity>
                : <View />
            }
            {/*<Song*/}
                {/*showAvatar={false}*/}
                {/*title={name}*/}
                {/*subTitle={item.item.title}*/}
            {/*/>*/}
        </View>
    )
};

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
        borderBottomColor: '#f2f2f2',
        borderRightColor: '#f2f2f2',
        borderRadius: 10,
        flexDirection: 'row'
    },
    avt: {
        // flex: 1/6,
        width: 100 * SCALE_RATIO,
        height: 100 * SCALE_RATIO,
        borderRadius: 50,
    },
    container2: {
        flexDirection: 'column',
    },
    online: {
        flex: 1,
        width: 30 * SCALE_RATIO,
        height: 30 * SCALE_RATIO,
        borderRadius: 50,
        borderWidth: 5 * SCALE_RATIO,
        borderColor: 'white',
        backgroundColor: '#17c603',
        marginTop: -30 * SCALE_RATIO,
        marginLeft: 70 * SCALE_RATIO
    },
    name: {
        fontSize: 17,
        color: 'black',
        paddingLeft: 10 * SCALE_RATIO
    },
    music: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 12 * SCALE_RATIO,
        width: 480 * SCALE_RATIO
    },
    container3: {
        flex: 1,
        marginLeft: 25 * SCALE_RATIO,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container4: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent :'center'
        alignItems: 'center'
    },
    container5: {
        flexDirection: 'row'
    },
    play: {
        flex: 1 / 5,
        justifyContent: 'center',
        alignItems: 'center',
        // width : 50 * SCALE_RATIO,
    }
});
