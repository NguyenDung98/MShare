import React from 'react';
import {View} from 'react-native';
import Song from "./Song";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import OptionItem from "./OptionItem";

export default function AlbumOption({song}) {
	const {artwork, artist, title} = song;

	return (
		<View style={{flex: 1}}>
			<Song
				uri={artwork}
				subTitle={artist}
				title={title}
				showMoreButton={false}
			/>
			<OptionItem
				title={'Thêm vào Playlist'}
				iconName={'playlist-add'}
				IconType={MaterialIcons}
			/>
			<OptionItem
				title={'Thêm vào danh sách phát'}
				iconName={'ios-add'}
				IconType={Ionicons}
			/>
		</View>
	)
}
