import RNMusicMetadata from "react-native-music-metadata";
import {removeEndFile} from "./TextUtils";

export const getAudioMetaData = async (assets) => {
	const uriAssets = assets.map(asset => asset.uri);
	const audiosMetaData = await RNMusicMetadata.getMetadata(uriAssets);
	return assets.map((asset, index) => {
		const metadata = audiosMetaData[index];

		return {
			...metadata,
			albumId: asset.albumId,
			artwork: getArtwork(metadata.artwork),
			title: metadata.title ? metadata.title : removeEndFile(asset.filename),
			artist: metadata.artist ? metadata.artist.trim() : 'Unknown artist',
			id: asset.id,
			filename: asset.filename,
			resource: 'device'
		}
	});
};

export const getArtwork = path => {
	if (!path) return '';
	return !isValidUrl(path) ? `data:image/png;base64, ${path}` : path;
};

export const isValidUrl = url => url.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
