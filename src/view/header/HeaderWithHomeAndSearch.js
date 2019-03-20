import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { SCALE_RATIO, HEADER_COLOR, STATUSBAR_COLOR, ICON_COLOR } from '../../constants/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function renderHeaderWithSearch() {
  return (
  <View style={styles.container}>
  <StatusBar backgroundColor= {STATUSBAR_COLOR}/>

  <MaterialCommunityIcons name ={'account-circle'} size={60 * SCALE_RATIO} style= {styles.icon} color={ICON_COLOR}/>

  <Text style={{flex: 3, backgroundColor: 'green'}}></Text>

  <MaterialCommunityIcons name ={'magnify'} size={60 * SCALE_RATIO} style= {styles.icon} color={ICON_COLOR}/>

  </View>
  );
}

const styles = StyleSheet.create({
  container : {
    height: 90 * SCALE_RATIO + (Platform.OS === 'android' ? 0 : getStatusBarHeight()),
    backgroundColor: HEADER_COLOR,
    flexDirection : 'row',
  },
  icon : {
    paddingRight: 34 * SCALE_RATIO,
    paddingLeft: 34 * SCALE_RATIO,
    paddingTop: 30 * SCALE_RATIO,

}

});
export default class HeaderWithHomeAndSearch {
}
