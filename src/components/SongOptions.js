import React from 'react';
import {View} from 'react-native';
import Song from "./Song";
import OptionItem from "./OptionItem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Action from "../actions";

export default function SongOptions({song, closeModal, onAddToPlaylist, onDownload}) {
	const {artwork, artist, title, resource} = song;
	const downloadOption = resource !== 'device';

	return (
		<View style={{flex: 1}}>
			<Song
				uri={artwork}
				subTitle={artist}
				title={title}
				showMoreButton={false}
			/>
			{downloadOption && (
				<OptionItem
					title={'Tải xuống'}
					iconName={'md-download'}
					IconType={Ionicons}
					iconSize={35}
					onPress={onDownload}
				/>
			)}
			<OptionItem
				title={'Thêm vào Playlist'}
				iconName={'playlist-add'}
				IconType={MaterialIcons}
				iconSize={35}
				onPress={onAddToPlaylist}
			/>
			<OptionItem
				title={'Thêm vào danh sách đang phát'}
				iconName={'ios-add'}
				IconType={Ionicons}
				iconSize={35}
				onPress={async () => {
					await Action.addToCurrentPlayList(song, true);
					closeModal();
				}}
			/>
		</View>
	)
}
