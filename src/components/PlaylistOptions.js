import React from 'react';
import {View} from 'react-native';
import ListItem from "./Song";
import OptionItem from "./OptionItem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function PlaylistOptions({playlist, closeModal, onEditPlaylistTitle, onDeletePlaylist}) {
	const {title} = playlist;

	return (
		<View style={{flex: 1}}>
			<ListItem
				title={title}
				avatarIconName={'queue-music'}
				avatarIconType={MaterialIcons}
				avatarIconWidth={50}
				imageStyle={{
					width: 65,
				}}
				showMoreButton={false}
			/>
			<OptionItem
				title={'Sửa tên playlist'}
				iconName={'edit'}
				IconType={MaterialIcons}
				iconSize={35}
				onPress={onEditPlaylistTitle}
			/>
			<OptionItem
				title={'Xóa playlist'}
				iconName={'ios-trash'}
				IconType={Ionicons}
				iconSize={35}
				onPress={onDeletePlaylist}
			/>
		</View>
	)
}
