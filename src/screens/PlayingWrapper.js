import React from 'react';
import {Modal, StyleSheet, ViewPagerAndroid, View} from 'react-native';
import PlayList from "./PlayList";
import Playing from "./Playing";
import PropTypes from 'prop-types';

export default function PlayingWrapper({visible, onRequestClose}) {
	return (
		<Modal
			animationType={'slide'}
			transparent={false}
			visible={visible}
			onRequestClose={onRequestClose}
		>
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
		</Modal>
	)
}

PlayingWrapper.propTypes = {
	visible: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	viewPager: {
		flex: 1,
	},
	pageStyle: {
		flex: 1,
	}
});
