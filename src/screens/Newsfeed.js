import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import { ItemNewsfeed } from '../components/NewsfeedItem';
import { list } from '../data/newsfeed';
import store from "../store";
const keyExtractor = item => item.id;

// const backgroundMain = require('./../imgs/mainBackground.jpg')

export default class NewsFeed extends Component {
    componentDidMount() {
        this.unsubcribe = store.onChange(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this.unsubcribe();
    }

	_renderItem = ({ item }) => (
        <ItemNewsfeed
            item={item}
        />
    );

    render() {
	    console.log(store.getState().userFriends);

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
