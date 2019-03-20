import React from 'react';
import {TouchableNativeFeedback, TouchableOpacity, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from "./Avatar";
import SongArtist from "./SongArtist";
import Button from "./Button";
import PropTypes from 'prop-types';

import {colors, SONG_ITEM_WIDTH, SONG_MARGIN} from "../utils/";

export default class Song extends React.PureComponent {
	static propTypes = {
		uri: PropTypes.string,
		songTitle: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		onPress: PropTypes.func,
		showAvatar: PropTypes.bool,
	};

	static defaultProps = {
		uri: '',
		onPress: () => {},
		showAvatar: true,
	};

	render() {
		const {uri, showAvatar, songTitle, artist, onPress} = this.props;
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View style={styles.container}>
					{showAvatar && (
						<Avatar uri={uri} width={SONG_ITEM_WIDTH}/>
					)}
					<SongArtist
						songTitle={songTitle}
						artist={artist}
						wrapperStyle={styles.songAuthor}
					/>
					<Button
						style={styles.moreBtnStyle}
						ButtonType={TouchableOpacity}
						IconType={Ionicons}
						name={'md-more'}
						size={30}
						color={colors.grey}
					/>
				</View>
			</TouchableNativeFeedback>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 15,
        marginTop: SONG_MARGIN,
        marginBottom: SONG_MARGIN,
        alignItems: 'center',
	    flex: 1,
    },
    songAuthor: {
        flexGrow: 1,
        marginLeft: 10,
	    flexBasis: '70%',
    },
    moreBtnStyle: {
        width: 30,
        alignItems: 'center',
    }
});
