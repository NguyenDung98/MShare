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
		return <AlbumItem item={item} index={index}/>
	};

	render() {
		return (
			<FlatList
				data={store.getState().albums}
				renderItem={this._renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
			/>
		);
	}
}
