import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import { ItemNewsfeed } from '../components/NewsfeedItem';
import { list } from '../data/newsfeed';
import store from '../store';

// const backgroundMain = require('./../imgs/mainBackground.jpg')
const keyExtractor = item  => item.id;

export default class NewsFeed extends Component {



    _renderItem = ({ item }) => (
        <ItemNewsfeed
            item={item}
        />

    )

    render() {
        const {userFriends} = store.getState()
        console.log(['userFriends', userFriends]);
        const data =Object.values(userFriends);
        return (
            <View>
                {/* <ImageBackground source={backgroundMain} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover'> */}
                {data ?
                    <FlatList
                        data={data}
                        renderItem={this._renderItem}
                        keyExtractor={keyExtractor}
                    />
                    :
                    <Text>Không có dữ liệu hiển thị</Text>
                }
            </View>
        );
    }
}
