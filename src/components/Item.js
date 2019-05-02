import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Song from './Song';
import { SCALE_RATIO } from '../constants/constants';
import { playSong } from '../utils/TrackUtils';
import Icon from 'react-native-vector-icons/Ionicons';


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
            
                    <TouchableOpacity style={styles.container3}>
                    <Song
                        uri={artwork}
                        subTitle={artist}
                        title={title}
                        showMoreButton={false}
                        onButtonPress={() => playSong(item)}
                        onPress={() => playSong(item)}
                        style= {{paddingBottom: 10}}
                    />
                    <View style={styles.play} >
                    <Icon name ='ios-play' size={35} />
                    </View>
                    </TouchableOpacity>
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
        flex: 5/6,
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
    },
    container3 : {
        flex: 1,
        flexDirection : 'row'
    },
    play : {
        flex : 1/6,
        justifyContent : 'center',
        alignItems : 'center', 
        // backgroundColor : 'green'
    }

})