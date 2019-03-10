/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import service from './src/service';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => service);
