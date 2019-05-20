import React, {Component} from 'react';
import { View, Text, SectionList, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SectionItem from "../components/Song";

import {deviceSection, SONG_PADDING} from "../utils";
import store from "../store";
import * as Action from "../actions";
const backgroundMain = require('./../imgs/background_home.jpg')

const keyExtractor = (_, index) => index.toString();

export default class HomeScreen extends Component {
	componentDidMount() {
		const {navigation} = this.props;

		this.unsubcribe = store.onChange(() => {
			this.forceUpdate()
		});
		this.navigationEventSubcriptions = Action.navigationEventSubscriptions(navigation);
	}

	componentWillUnmount() {
		this.unsubcribe();
		this.navigationEventSubcriptions.forEach(event => event.remove())
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
				subTitleColor={'white'}
				titleColor={'white'}
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
			<View style={{margin: SONG_PADDING}}>
				<Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>{title.toUpperCase()}</Text>
			</View>
		)
	};

	render() {
		return (
			<ImageBackground source={backgroundMain} style={{ flex: 1, justifyContent  : 'center' }} resizeMode='cover'>
			<SectionList
				renderItem={this._renderItem}
				renderSectionHeader={this._renderSectionHeader}
				sections={[
					{title: 'Thư viện', data: deviceSection()}
				]}
				keyExtractor={keyExtractor}
			/>
			</ImageBackground>
		);
	}
}
