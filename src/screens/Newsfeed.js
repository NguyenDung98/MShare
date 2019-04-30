import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { userFriends } from '../data/Friend';
import { ItemNewsfeed } from '../components/NewsfeedItem';
const keyExtractor = item => item.id;

export default class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    _renderItem =  ({item}) => (
		<ItemNewsfeed
			item = {item}
		/>
	)

    render() {
        return (
            <View>
                <FlatList
                    extraData={userFriends.friends.data}
                    data={userFriends.friends.data}
                    renderItem={this._renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        );
    }
}
