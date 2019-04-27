import React, {Component} from 'react';
import {View, Text, SectionList, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SectionItem from "../components/Song";

import {colors, deviceSection, SONG_MARGIN} from "../utils";
import store from "../store";
import IconButton from "../components/IconButton";
import {ICON_COLOR} from "../constants/constants";

const keyExtractor = (_, index) => index.toString();
const BUTTON_SIZE = 40;

export default class HomeScreen extends Component {
	static navigationOptions = ({navigation: {navigate}}) => ({
		headerLeft: (
			<IconButton
				name={'account-circle'}
				iconSize={BUTTON_SIZE}
				style={styles.leftHeaderBtnStyle}
				color={ICON_COLOR}
				IconType={MaterialIcons}
				ButtonType={TouchableNativeFeedback}
				buttonProps={{
					background: TouchableNativeFeedback.Ripple(colors.lightGrey, true)
				}}
				onPress={() => navigate('Profile')}
			/>
		)
	});

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_renderItem = ({item}) => {
		const {avatarIconName, iconType, title, subTitle, targetScreen} = item;
		const {navigation: {navigate}} = this.props;

		return (
			<SectionItem
				title={title}
				subTitle={subTitle}
				avatarIconName={avatarIconName}
				avatarIconType={iconType}
				onButtonPress={() => navigate(targetScreen)}
				buttonType={TouchableWithoutFeedback}
				buttonIconName={'chevron-small-right'}
				buttonIconType={Entypo}
				imageStyle={{
					width: 50,
					borderRadius: 25,
				}}
				avatarIconWidth={40}
				onPress={() => navigate(targetScreen)}
			/>
		)
	};

	_renderSectionHeader = ({section: {title}}) => {
		return (
			<View style={{margin: SONG_MARGIN}}>
				<Text style={{fontSize: 25, color: 'black'}}>{title.toUpperCase()}</Text>
			</View>
		)
	};

	render() {
		return (
			<SectionList
				renderItem={this._renderItem}
				renderSectionHeader={this._renderSectionHeader}
				sections={[
					{title: 'Thư viện', data: deviceSection()}
				]}
				keyExtractor={keyExtractor}
			/>
		);
	}
}

const styles = StyleSheet.create({
	leftHeaderBtnStyle: {
		marginLeft: 10,
		width: BUTTON_SIZE,
		height: BUTTON_SIZE,
		borderRadius: BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
