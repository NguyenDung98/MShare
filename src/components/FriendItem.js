import React from 'react';
import {StyleSheet} from 'react-native';
import {SCALE_RATIO} from '../constants/constants';

import Song from "./Song";

export function ItemFriend({item}) {
	const {name, avatarUrl, online, stateTrack, playingSong} = item;
	return (
		<Song
			showBadge
			showAlternativeIcon={false}
			uri={avatarUrl}
			title={name}
			// subTitle={item.item.title}
			avatarIconWidth={50}
			imageStyle={{borderRadius: 25}}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 20 * SCALE_RATIO,
		marginLeft: 25 * SCALE_RATIO
	},
	avt: {
		// flex: 1/6,
		width: 100 * SCALE_RATIO,
		height: 100 * SCALE_RATIO,
		borderRadius: 50 * SCALE_RATIO,
	},
	container2: {
		flexDirection: 'column',
	},
	online: {
		width: 30 * SCALE_RATIO,
		height: 30 * SCALE_RATIO,
		borderRadius: 50,
		borderWidth: 5 * SCALE_RATIO,
		borderColor: 'white',
		backgroundColor: '#17c603',
		marginTop: -30 * SCALE_RATIO,
		marginLeft: 70 * SCALE_RATIO
	},
	name: {
		fontSize: 17,
		color: 'black',
		paddingLeft: 10 * SCALE_RATIO
	},
	music: {
		fontSize: 16,
		color: 'gray',
		marginLeft: 12 * SCALE_RATIO,
		width: 480 * SCALE_RATIO
	},
	container3: {
		flex: 1,
		marginLeft: 25 * SCALE_RATIO,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	container4: {
		flex: 1,
		flexDirection: 'row',
		// justifyContent :'center'
		alignItems: 'center'
	},
	container5: {
		flexDirection: 'row'
	},
	play: {
		flex: 1 / 5,
		justifyContent: 'center',
		alignItems: 'center',
		// width : 50 * SCALE_RATIO,
	}
});
