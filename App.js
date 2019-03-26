import React, {Component} from 'react';
import {View} from "react-native";
import AppNavigator from "./src/navigation/AppNavigator"
import StaticPlayingWidget from "./src/components/StaticPlayingWidget";

import store from "./src/store";
import {SONG_ITEM_WIDTH} from "./src/utils";
import NavigationService from "./src/service/NavigationService";

export default class App extends Component {
	componentDidMount() {
		this.subscription = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.subscription.remove();
	}

	render() {
		const showStaticWidget = store.getState().showStaticWidget;

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
