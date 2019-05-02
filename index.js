/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import TrackPlayer from 'react-native-track-player';
import audioService from './src/service/audioService';
import timerService from './src/service/timerService';

console.disableYellowBox = true;
// setup firebase


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => audioService);
AppRegistry.registerHeadlessTask('timer', () => timerService);


