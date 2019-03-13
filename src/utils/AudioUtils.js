import RNMusicMetadata from "react-native-music-metadata";

export const takeAudioMetaData = async (assets) => {
	const uriAssets = assets.map(asset => asset.uri);
	console.log(uriAssets);
	const audiosMetaData = await RNMusicMetadata.getMetadata(uriAssets);
	const audios = assets.map((asset, index) => ({...audiosMetaData[index], filename: asset.filename, id: asset.id}));

	return audios;
};
