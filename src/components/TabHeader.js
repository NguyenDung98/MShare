import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Platform, TouchableOpacity} from 'react-native';
import {SCALE_RATIO, HEADER_COLOR, ICON_COLOR} from '../constants/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationService from "../service/NavigationService";
import {colors} from "../utils";

export default class TabHeader extends Component {
	constructor(props){
		super(props)
	}
	_handleSearchPress = () => {
		NavigationService.navigate('SearchTabScreen');
	};
	render() {
		const {container, icon} = styles;

		return (
			<View style={container}>
				<StatusBar backgroundColor={colors.brightRed}/>
				<TouchableOpacity onPress={()=>{NavigationService.navigate('Profile')}}>
				<MaterialCommunityIcons
					name={'account-circle'}
					size={60 * SCALE_RATIO}
					style={icon}
					color={ICON_COLOR}
				/>
				</TouchableOpacity>
				<AntDesign
					name={'search1'}
					size={60 * SCALE_RATIO}
					style={icon}
					color={ICON_COLOR}
					onPress={this._handleSearchPress}
				/>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	container: {
		height: 49,
		backgroundColor: colors.brightRed,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		marginHorizontal: 34 * SCALE_RATIO,
		// paddingTop: 30 * SCALE_RATIO,
		alignItems: "center",
	},
});
