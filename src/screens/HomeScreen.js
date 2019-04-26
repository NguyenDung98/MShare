import React, {Component} from 'react';
import {View, Text, SectionList, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SectionItem from "../components/Song";

import {deviceSection, SONG_MARGIN} from "../utils";
import store from "../store";

const keyExtractor = (_, index) => index.toString();

export default class HomeScreen extends Component {
	// static navigationOptions = {
	//
	// };

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

const styles = StyleSheet.create({});
