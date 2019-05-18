import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import { ItemNewsfeed } from '../components/NewsfeedItem';
import { list } from '../data/newsfeed';
const keyExtractor = item => item.id;

// const backgroundMain = require('./../imgs/mainBackground.jpg')

export default class NewsFeed extends Component {
    _renderItem = ({ item }) => (
        <ItemNewsfeed
            item={item}
        />
    )

    render() {
        return (
                // <ImageBackground source={backgroundMain} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover'>             
                <FlatList
                    extraData={list}
                    data={list}
                    renderItem={this._renderItem}
                    keyExtractor={keyExtractor}
                />
                // </ImageBackground>
        );
    }
}
