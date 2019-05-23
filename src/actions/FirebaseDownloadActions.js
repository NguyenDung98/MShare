import store from "../store";
import {Alert, ToastAndroid} from "react-native";
import firebase from "react-native-firebase";
import * as MediaLibrary from "expo-media-library";
import {getAudioMetaData} from "../utils";
import {addToDownloads, updateToLibrary} from "./SongActions";

export const downloadSong = () => {
	const {selectedSong, downloads, downloadingSong} = store.getState();
	const isDownloaded = downloads.some(song => selectedSong.id === song.onlineID);

	if (!downloadingSong && !isDownloaded) {
		downloadSongFromFirebase(true);
	} else {
		Alert.alert(
			'Cảnh báo',
			`Bạn đã tải: "${selectedSong.title}" rồi, bạn có muốn tải lại?`,
			[
				{text: 'Xác nhận', onPress: handleDownloadOverride},
				{text: 'Huỷ bỏ', style: 'cancel'}
			]
		)
	}
};

const downloadSongFromFirebase = addToLibrary => {
	const storageRef = firebase.storage().ref('/music');
	const {selectedSong, downloadingSong} = store.getState();
	const uri = `${firebase.storage.Native.EXTERNAL_STORAGE_DIRECTORY_PATH}/MShare/${selectedSong.filename}`;

	const unsubscribe = storageRef.child(selectedSong.filename)
		.downloadFile(uri)
		.on(firebase.storage.TaskEvent.STATE_CHANGED, async snapshot => {
			if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
				const asset = await MediaLibrary.createAssetAsync(uri);
				const song = await getAudioMetaData([asset]);

				addToDownloads({
					...song[0],
					onlineID: selectedSong.id,
				});
				if (addToLibrary) {
					updateToLibrary(song[0])
				}
				ToastAndroid.showWithGravityAndOffset(
					`Tải bài hát "${selectedSong.title}" thành công`,
					ToastAndroid.LONG,
					ToastAndroid.BOTTOM,
					25,
					50,
				);
			} else {
				store.setState({
					downloadingSong: downloadingSong ? downloadingSong : selectedSong,
					downloadProgress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100),
				})
			}
		}, error => {
			unsubscribe();
			console.log(error);
		})
};

const handleDownloadOverride = async () => {
	const {downloads, selectedSong} = store.getState();
	const alreadyDownloadedSong = downloads.find(song => song.onlineID === selectedSong.id);

	await MediaLibrary.deleteAssetsAsync([alreadyDownloadedSong.id]);
	const data = downloads.filter(song => song.onlineID !== selectedSong.id);
	store.setState({
		downloads: data
	});
	downloadSongFromFirebase();
};
