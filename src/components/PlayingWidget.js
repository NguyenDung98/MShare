import React from 'react';
import {StyleSheet, View} from 'react-native';
import Progress from "./Progress";
import PlayingButtons from "./PlayingButtons";
import TrackPlayer from 'react-native-track-player';

import {REPEAT_STATE} from "../utils";
import store from "../store";

export default class PlayingWidget extends React.Component {
    _onTogglePlay = async () => {
        const {currentPlayState} = this.props;

        if (currentPlayState === TrackPlayer.STATE_PLAYING) {
            await TrackPlayer.pause();
        } else if (currentPlayState === TrackPlayer.STATE_PAUSED) {
            await TrackPlayer.play();
        }
    };

	_onToggleRepeat = () => {
	    const {repeatState} = store.getState();

	    switch (repeatState) {
            case REPEAT_STATE.off:
                store.setState({repeatState: REPEAT_STATE.all});
                break;
            case REPEAT_STATE.all:
	            store.setState({repeatState: REPEAT_STATE.once});
                break;
            case REPEAT_STATE.once:
	            store.setState({repeatState: REPEAT_STATE.off});
                break;
	    }
    };

	_onToggleShuffle = () => {
	    const {shuffleState} = store.getState();

	    store.setState({
            shuffleState: !shuffleState
        })
   };

    render() {
        const {currentPlayState} = this.props;
        const {shuffleState, repeatState} = store.getState();

        return (
            <View style={styles.container}>
                <Progress/>
                <PlayingButtons
                    playing={currentPlayState === TrackPlayer.STATE_PLAYING}
                    onPlayTogglePress={this._onTogglePlay}
                    onRepeatTogglePress={this._onToggleRepeat}
                    repeatState={repeatState}
                    onShuffleTogglePress={this._onToggleShuffle}
                    shuffleState={shuffleState}
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
