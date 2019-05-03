import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ItemNewsfeed } from '../components/NewsfeedItem';
import { list } from '../data/newsfeed';
const keyExtractor = item => item.id;

export default class NewsFeed extends Component {
	_renderItem =  ({item}) => (
		<ItemNewsfeed
			item = {item}
		/>
	)

    render() {
        return (
            <View>
                <FlatList
                    extraData={list}
                    data={list}
                    renderItem={this._renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        );
    }
}
