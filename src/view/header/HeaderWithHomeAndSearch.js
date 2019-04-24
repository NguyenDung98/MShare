
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