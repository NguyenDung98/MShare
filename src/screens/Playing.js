import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Avatar from "../components/Avatar";
import SongArtist from "../components/SongArtist";
import PlayingWidget from "../components/PlayingWidget";

import TrackPlayer from 'react-native-track-player';
import {colors} from "../utils";
// import console = require('console');

const ARTWORK_SIZE = Dimensions.get('screen').height * 0.35;

export default class Playing extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : "",
            artist : "",
        }
    }

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
        this.setState({
            title: this.props.navigation.getParam("title"),
            artist: this.props.navigation.getParam("artist"),
        });
        let track = {
            id:  this.props.navigation.getParam("id"),
            url: this.props.navigation.getParam("uri"),
            title:this.props.navigation.getParam("title"),
            artist: this.props.navigation.getParam("artist"),
            album: this.props.navigation.getParam("albumArtist"),
            genre: '',
            date: '2014-05-20T07:00:00+00:00',
            artwork: 'https://picsum.photos/600/600',
            duration: this.props.navigation.getParam("duration"),
            description: this.props.navigation.getParam("title") ,
        };

        // let track = {
        //     id: 'unique track id',
        //     url: "C:/Users/Dung/Music/Mất Trí Nhớ_Chi Dân_-1074309392.mp3",
        //     title: 'Avaritia',
        //     artist: 'deadmau5',
        //     album: 'while(1<2)',
        //     genre: 'Progressive House, Electro House',
        //     date: '2014-05-20T07:00:00+00:00',
        //     artwork: 'https://picsum.photos/600/600',
        //     duration: 100,
        //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque debitis nam odio.",
        // };

        console.log("=================== STATE =============")
        console.log(this.state);
        console.log("============ TRACK =============");
        console.log(track);
        

        await TrackPlayer.add(track);
        await TrackPlayer.play();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.nowPlaying}>NOW PLAYING</Text>
                <Avatar
                    uri={""}
                    width={ARTWORK_SIZE}
                    elevation={30}
                />
                <SongArtist
	                song={this.state.title}
	                artist={this.state.artist}
	                songSize={25}
	                artistSize={18}
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
