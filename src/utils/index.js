export * from './colors';
export * from './TimeUtils';
export * from './AudioUtils';
export * from './constants';
export * from './TextUtils';
export * from './TrackUtils';

export function shuffle(a) {
	const arrCopy = a.slice();

	for (let i = arrCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
	}
	return arrCopy;
}
