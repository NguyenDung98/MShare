import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import { ItemNewsfeed } from '../components/NewsfeedItem';
import store from "../store";
import { colors } from '../utils/colors';

const backgroundMain = require('./../imgs/background_newfeed.jpg')
const keyExtractor = item => item.id;

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
    )

    render() {
        const { userFriends } = store.getState()
        console.log(['userFriends', userFriends]);
        const data = Object.values(userFriends);
        return (
            // <ImageBackground source={backgroundMain} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover'>
            <View style={{flex :1, backgroundColor : colors.background_color }}>
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
