import React, {Component} from 'react';
import {StyleSheet, ViewPagerAndroid, View} from 'react-native';
import PlayList from "./PlayList";
import Playing from "./Playing";

export default class PlayingWrapper extends Component {
	render() {
		return (
			<ViewPagerAndroid
				style={styles.viewPager}
				initialPage={1}
			>
				<View
					style={styles.pageStyle}
					key={'1'}
				>
					<PlayList/>
				</View>
				<View
					style={styles.pageStyle}
					key={'2'}
				>
					<Playing/>
				</View>
			</ViewPagerAndroid>
		)
	}
}

const styles = StyleSheet.create({
	viewPager: {
		flex: 1,
	},
	pageStyle: {
		flex: 1,
	}
});
