import React, { Component } from 'react';
import { View, Text , StyleSheet} from 'react-native';
import { SCALE_RATIO, ICON_COLOR } from '../../constants/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function GetIconRight({name = '', size = 0}) {
    return (
      <View style= {styles.container}>
          <MaterialCommunityIcons name ={name} size={size} style= {styles.icon} color={ICON_COLOR}/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    icon : {
      paddingRight: 34 * SCALE_RATIO,
      paddingLeft: 34 * SCALE_RATIO,

    }
})