import React, {Component} from 'react';
import {Text, Image, StyleSheet, Dimensions, FlatList, View} from 'react-native';
import * as Action from "../actions";
import {colors} from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";

const DATA = [
	{
		artwork: 'https://picsum.photos/600/600/?image',
		artist: 'Unknown',
		title: 'Title 1',
		id: '0',
	},
	{
		artwork: 'https://picsum.photos/600/600/?image',
		artist: 'No name no age',
		title: 'No identity',
		id: '1',
	},
	{
		artwork: 'https://picsum.photos/600/600/?image',
		artist: 'No name no age',
		title: 'No identity',
		id: '2',
	},
	{
		artwork: 'https://picsum.photos/600/600/?image',
		artist: 'No name no age',
		title: 'No identity',
		id: '3',
	},
	{
		artwork: 'https://picsum.photos/600/600/?image',
		artist: 'No name no age',
		title: 'No identity',
		id: '4',
	},
];

const MARGIN = 18;
const ARTWORK_SIZE = (Dimensions.get('screen').width - (MARGIN * 3)) * 0.5;

const keyExtractor = (item) => item.id;

export default class Albums extends Component {
	componentDidMount() {
		// temporary
		Action.setUpAlbumList();
	}

	_renderItem = ({item, index}) => {
		const style = {
			marginTop: index / 2 < 1 ? MARGIN : MARGIN / 2,
			marginLeft: index % 2 === 0 ? MARGIN : MARGIN / 2,
			marginRight: index % 2 === 0 ? MARGIN / 2 : MARGIN,
			marginBottom: MARGIN / 2,
		};

		return (
			<View style={style}>
				<Image
					source={{uri: item.artwork}}
					style={{
						borderRadius: 5,
						aspectRatio: 1.3,
						width: ARTWORK_SIZE,
						borderWidth: StyleSheet.hairlineWidth,
						borderColor: colors.lightGrey,
					}}
				/>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: colors.transparent,
					}}
				>
					<Button
						style={{width: 30, position: 'absolute', right: -15, opacity: 0.3}}
						IconType={Ionicons}
						name={'md-more'}
						iconSize={30}
						color={'black'}
					/>
					<View
						style={{
							position: 'absolute',
							bottom: 0,
							height: '40%',
							width: '100%',
							backgroundColor: colors.white,
							opacity: 0.9,
							borderWidth: StyleSheet.hairlineWidth,
							borderColor: colors.lighterGrey,
							borderBottomLeftRadius: 5,
							borderBottomRightRadius: 5,
							justifyContent: 'center'
						}}
					>
						<Text style={{marginLeft: 5, fontSize: 13, color: 'black'}}>{item.title}</Text>
						<Text style={{marginLeft: 5, fontSize: 11}}>{item.artist}</Text>
						<Button
							style={{width: 30, position: 'absolute', right: 0}}
							IconType={Ionicons}
							name={'ios-heart-empty'}
							iconSize={30}
							color={colors.brightRed}
						/>
					</View>
				</View>
			</View>
		)
	};

	render() {
		return (
			<FlatList
				data={DATA}
				renderItem={this._renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
			/>
		);
	}
}
