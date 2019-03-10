import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Avatar from "../Components/Avatar";
import SongAuthor from "../Components/SongAuthor";
import PlayingWidget from "../Components/PlayingWidget";

import TrackPlayer from 'react-native-track-player';
import {colors} from "../utils";

const ARTWORK_SIZE = Dimensions.get('screen').height * 0.35;

export default class Playing extends Component {
    async componentDidMount() {
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE
            ],
            color: '#FF9ACD32'
        });

        let track = {
            id: 'unique track id',
            url: 'https://vnno-vn-6-tf-mp3-s1-zmp3.zadn.vn/14033a2d036aea34b37b/3492656630613786320?authen=exp=1552276310~acl=/14033a2d036aea34b37b/*~hmac=449801633d9cfa21833819c0665aa2ae&filename=Dung-Nguoi-Dung-Thoi-Diem-Thanh-Hung.mp3',
            title: 'Avaritia',
            artist: 'deadmau5',
            album: 'while(1<2)',
            genre: 'Progressive House, Electro House',
            date: '2014-05-20T07:00:00+00:00',
            artwork: 'https://picsum.photos/600/600',
            duration: 100,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque debitis nam odio.",
        };

        await TrackPlayer.add(track);
        await TrackPlayer.play();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.nowPlaying}>NOW PLAYING</Text>
                <Avatar
                    uri={'https://picsum.photos/600/600'}
                    width={ARTWORK_SIZE}
                    elevation={30}
                />
                <SongAuthor
                    song={'Breathin Breathin'}
                    authorName={'Ariana Grande'}
                    songSize={25}
                    authorSize={18}
                    wrapperStyle={styles.songAuthor}
                />
                <PlayingWidget/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    nowPlaying: {
        flexGrow: 1,
        textAlignVertical: 'bottom',
        color: colors.grey,
        marginBottom: 20,
        letterSpacing: 3,
    },
    songAuthor: {
        alignItems: 'center',
        marginTop: 20
    },
});