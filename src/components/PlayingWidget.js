import React from 'react';
import {StyleSheet, View} from 'react-native';
import Progress from "./Progress";
import PlayingButtons from "./PlayingButtons";
import TrackPlayer from 'react-native-track-player';

export default class PlayingWidget extends React.Component {
    state = {
        currentPlayState: null
    };

    componentDidMount() {
        this.subcriptions = [
            TrackPlayer.addEventListener('playback-state', ({state}) => {
                this.setState({currentPlayState: state})
            }),
        ]
    }

    componentWillUnmount() {
        this.subcriptions.forEach(subscription => subscription.remove())
    }

    _onTogglePlay = async () => {
        const {currentPlayState} = this.state;

        if (currentPlayState === TrackPlayer.STATE_PLAYING) {
            await TrackPlayer.pause();
        } else if (currentPlayState === TrackPlayer.STATE_PAUSED) {
            await TrackPlayer.play();
        }
    };

    render() {
        const {currentPlayState} = this.state;

        return (
            <View style={styles.container}>
                <Progress/>
                <PlayingButtons
                    playing={currentPlayState === TrackPlayer.STATE_PLAYING}
                    onPlayTogglePress={this._onTogglePlay}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        padding: 25,
    }
});