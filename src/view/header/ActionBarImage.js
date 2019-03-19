import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image } from 'react-native';
import { SCALE_RATIO } from '../../constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-vector-icons/FontAwesome';
;
 
export default class ActionBarImage extends Component {
render() {
return (
    <View style={{ flexDirection: 'row' }}>
    <TouchableOpacity>
    {/* <Image
        source={{
        uri:
            'http://aboutreact.com/wp-content/uploads/2018/07/logosmalltransparen.png',
        }}
        style={{
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginRight: 15 * SCALE_RATIO,
        }}
    /> */}
    <Ionicons name="search" size={25} color="#900" style={{paddingRight: 30 * SCALE_RATIO}} />
    </TouchableOpacity>
    </View>
);
}
}