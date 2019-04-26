import React from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import ListItem from "./Song";
import PropTypes from "prop-types";

import store from "../store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {colors} from "../utils";

const keyExtractor = (_, index) => index.toString();

export default class SongToPlaylistOption extends React.Component {
	static propTypes = {
		onClickCreateBtn: PropTypes.func,
		onAddToPlaylist: PropTypes.func,
	};

	_renderItem = ({item, index}) => {
		const {onClickCreateBtn, onAddToPlaylist} = this.props;

		if (index === 0) {
			return (
				<ListItem
					title={'Tạo playlist'}
					imageStyle={{
						width: 65,
					}}
					showMoreButton={false}
					showOverlayIcon
					showAlternativeIcon={false}
					onPress={onClickCreateBtn}
				/>
			)
		}
		const {title, songs} = item;

		return (
			<ListItem
				title={title}
				subTitle={songs.length.toString() + ' bài hát'}
				avatarIconName={'queue-music'}
				avatarIconType={MaterialIcons}
				avatarIconWidth={50}
				imageStyle={{
					width: 65,
				}}
				showMoreButton={false}
				onPress={() => onAddToPlaylist(index)}
			/>
		)
	};

	render() {
		const {titleContainer, titleStyle, createBtnStyle, titleCreateBtnStyle} = styles;
		const {playlists} = store.getState();
		const renderData = [null, ...playlists];

		return (
			<View style={{flex: 1}}>
				<View style={titleContainer}>
					<Text style={titleStyle}>
						Thêm vào playlist
					</Text>
				</View>
				<FlatList
					keyExtractor={keyExtractor}
					data={renderData}
					renderItem={this._renderItem}
				/>
			</View>
		)

	}
}

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 10,
	},
	titleStyle: {
		fontSize: 20,
		color: 'black',
		textAlign: 'center',
	},
	createBtnStyle: {
		marginVertical: 15,
		marginHorizontal: '20%',
		borderRadius: 20,
		padding: 10,
		backgroundColor: colors.brightRed,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.lighterGrey,
		elevation: 5,
	},
	titleCreateBtnStyle: {
		color: colors.white,
		fontSize: 18,
	},
});
