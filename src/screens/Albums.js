import React, {Component} from 'react';
import {FlatList} from 'react-native';
import store from "../store";
import AlbumItem from "../components/AlbumItem";

const keyExtractor = (_, index) => index.toString();

export default class Albums extends Component {
	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item, index}) => {
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
		const data = getParam('dataName');

		return (
			<FlatList
				data={store.getState()[data]}
				renderItem={this._renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
			/>
		);
	}
}
