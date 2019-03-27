import React, {Component} from 'react';
import {View} from "react-native";
import AppNavigator from "./src/navigation/AppNavigator"
import StaticPlayingWidget from "./src/components/StaticPlayingWidget";

import store from "./src/store";
import * as Action from './src/actions/'
import {SONG_ITEM_WIDTH} from "./src/utils";
import NavigationService from "./src/service/NavigationService";

export default class App extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		});
		this.subscriptions = Action.subscriptions;
	}

	componentWillUnmount() {
		this.unsubcribe();
		this.subscriptions.forEach(subscription => subscription.remove());
	}

	render() {
		const {showStaticWidget} = store.getState();

		return (
			<View style={{flex: 1}}>
				<AppNavigator
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef)
                    }}
                />
				{showStaticWidget && (
					<View style={{height: SONG_ITEM_WIDTH}}>
						<StaticPlayingWidget/>
					</View>
				)}
			</View>
		)
	}
}
