import React from 'react';
import {View} from 'react-native';
import Song from "./Song";
import OptionItem from "./OptionItem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Action from "../actions";

export default function SongOption({song, closeModal, onAddToPlaylist}) {
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
				iconSize={40}
				onPress={onAddToPlaylist}
			/>
			<OptionItem
				title={'Thêm vào danh sách đang phát'}
				iconName={'ios-add'}
				IconType={Ionicons}
				iconSize={40}
				onPress={async () => {
					await Action.addToPlayingList(song, true);
					closeModal();
				}}
			/>
		</View>
	)
}
