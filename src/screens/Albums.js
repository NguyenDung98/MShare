import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import store from "../store";
import AlbumItem from "../components/AlbumItem";
import {colors, SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils";

const keyExtractor = (_, index) => index.toString();
const MARGIN = 18;
const ARTWORK_SIZE = (SCREEN_WIDTH - (MARGIN * 3)) * 0.5;
const numOfFirstItems = Math.round(SCREEN_HEIGHT / (ARTWORK_SIZE + MARGIN)) * 2;

export default class Albums extends Component {
	endItems = numOfFirstItems;

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_loadMoreAlbums = (data) => {
		if (this.endItems < data.length) {
			this.endItems =  this.endItems + numOfFirstItems;
			this.forceUpdate();
		}
	};

	_getItemLayout = (data, index) => {
		const style = {
			marginTop: index / 2 < 1 ? MARGIN : MARGIN / 2,
			marginBottom: MARGIN / 2,
		};

		return {
			length: ARTWORK_SIZE + style.marginTop + style.marginBottom,
			offset: index === 0 ? 0 : (ARTWORK_SIZE + MARGIN) * index + MARGIN / 2,
			index,
		}
	};

	_renderItem = ({item, index}) => {
		if (!item) return null;

		const {navigation: {navigate, getParam}} = this.props;

		return (
			<AlbumItem
				item={item}
				index={index}
				onPress={() => navigate('CollectionDetail', {
					type: 'Album',
					index,
					dataName: getParam('dataName'),
				})}
			/>
		)
	};

	render() {
		const {navigation: {getParam}} = this.props;
		const dataName = getParam('dataName');
		const data = store.getState()[dataName];
		const {searching} = store.getState();

		return (
			<FlatList
				ListEmptyComponent={searching && (
					<View style={{marginTop: 10}}>
						<ActivityIndicator
							size={'large'}
							color={colors.mainColor}
						/>
					</View>
				)}
				keyExtractor={keyExtractor}
				data={data.slice(0, this.endItems)}
				renderItem={this._renderItem}
				onEndReached={() => this._loadMoreAlbums(data)}
				numColumns={2}
				getItemLayout={this._getItemLayout}
				showsVerticalScrollIndicator={false}
				initialNumToRender={numOfFirstItems}
			/>
		);
	}
}
