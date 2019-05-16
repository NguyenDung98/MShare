import React from 'react';
import {View} from 'react-native';
import Song from "./Song";
import OptionItem from "./OptionItem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Action from "../actions";

export default function SongOptions({song, closeModal, onAddToPlaylist, onMoveToProfile}) {
	const hasSong = song && typeof song === 'object';
	const {artwork, artist, title} = hasSong ? song : {};

	return (
		<View style={{flex: 1}}>
			{hasSong ? (
				<View style={{flex: 1}}>
					<Song
						uri={artwork}
						subTitle={artist}
						title={title}
						showMoreButton={false}
					/>
					<OptionItem
						title={'Đi đến Profile'}
						iconName={'account-circle'}
						IconType={MaterialIcons}
						iconSize={40}
						onPress={() => {
							onMoveToProfile();
							closeModal();
						}}
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
							await Action.addToCurrentPlayList(song, true);
							closeModal();
						}}
					/>
				</View>
			) : (
				<OptionItem
					title={'Đi đến Profile'}
					iconName={'account-circle'}
					IconType={MaterialIcons}
					iconSize={40}
					onPress={() => {
						onMoveToProfile();
						closeModal();
					}}
				/>
			)}
		</View>
	)
}
