import React from 'react';
import {TouchableNativeFeedback, TouchableOpacity, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from "./Avatar";
import SongArtist from "./SongArtist";
import Button from "./Button";
import PropTypes from 'prop-types';
import {colors}from "../utils/";

export default class Song extends React.PureComponent {
	render() {
		const {uri, song, artist, onPress} = this.props;
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View style={styles.container}>
					<Avatar uri={uri} width={65}/>
					<SongArtist
						song={song}
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

Song.propTypes = {
    uri: PropTypes.string,
    song: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
	onPress: PropTypes.func,
};

Song.defaultProps = {
    uri: '',
	onPress: () => {}
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 15,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
	    flex: 1,
    },
    songAuthor: {
        flexGrow: 1,
        marginLeft: 10,
	    maxWidth: '60%'
    },
    moreBtnStyle: {
        width: 30,
        alignItems: 'center',
    }
});
