import React, {Component} from 'react';
import {Animated, Easing, FlatList, View, StatusBar} from 'react-native';
import Song from "../components/Song";
import CollectionDetailHeader from "../components/CollectionDetailHeader";
import CollectionDetailWidget from "../components/CollectionDetailWidget";

import {AVATAR_SIZE, colors, playSong, SCREEN_HEIGHT, SCREEN_WIDTH, SONG_ITEM_WIDTH} from "../utils";
import store from "../store";

const keyExtractor = (_, index) => index.toString();

export default class CollectionDetail extends Component {
	static navigationOptions = {
		header: null,
		headerStyle: {
			height: 0,
			width: 0,
		}
	};

	state = {
		songs: [],
		image: null,
		title: null,
		type: null,
		animation: false,
	};

	titlePosition = new Animated.Value(0);

	componentDidMount() {
		this.unsubcribe = store.onChange(() => {
			this.forceUpdate();
		});
	}

	componentWillMount() {
		const {navigation: {state: {params}}} = this.props;
		const {type, index, dataName} = params;

		if (type !== null && index !== null) {
			if (type === 'Album') {
				const {songs, artwork, artist, title} = store.getState()[dataName][index];
				this.setState({
					songs,
					image: artwork,
					title,
					type,
				})
			} else {
				const {songs, avatar, name} = store.getState()[dataName][index];
				this.setState({
					songs,
					image: avatar,
					title: name,
					type,
				})
			}
		}
	}

	componentWillUnmount() {
		this.unsubcribe();
	}

	_onLayout = ({nativeEvent: {layout: {width}}}) => {
		if (width > SCREEN_WIDTH * 0.6 && !this.state.animation) {
			this.setState({
				animation: true,
			});
			Animated.loop(Animated.timing(this.titlePosition, {
				toValue: -SCREEN_WIDTH * 1.18,
				duration: 10000,
				easing: Easing.linear(),
				useNativeDriver: true,
			})).start()
		}
	};

	_renderItem = ({item}) => {
		const {artwork, artist, title} = item;

		return (
			<Song
				uri={artwork}
				artist={artist}
				songTitle={title}
				onPress={() => playSong(item)}
			/>
		)
	};

	_changeWidth = () => {
		if (this.state.animation) {
			return {
				width: '120%',
			}
		}
	};

	_changeTitle = () => {
		const {title} = this.state;
		if (this.state.animation) {
			return title + "        " + title
		}

		return title;
	};

	render() {
		const {navigation: {goBack}} = this.props;
		const {songs, image, type} = this.state;
		const {showStaticWidget} = store.getState();
		const songListStyle = {
			top: -AVATAR_SIZE * 0.4,
			height: showStaticWidget ?
				SCREEN_HEIGHT - SCREEN_HEIGHT * 0.3 - AVATAR_SIZE * 0.6 - SONG_ITEM_WIDTH :
				SCREEN_HEIGHT - SCREEN_HEIGHT * 0.3 - AVATAR_SIZE * 0.6,
		};

		return (
			<View>
				<StatusBar
					backgroundColor={colors.transparent}
					translucent
				/>
				<CollectionDetailHeader
					type={type}
					image={image}
					goBack={goBack}
					songs={songs.length}
					title={this._changeTitle()}
					onLayout={this._onLayout}
					customTitleStyle={{
						transform: [{translateX: this.titlePosition}],
						...this._changeWidth()
					}}
				/>
				<CollectionDetailWidget
					image={image}
				/>
				<FlatList
					data={songs}
					renderItem={this._renderItem}
					keyExtractor={keyExtractor}
					style={songListStyle}
				/>
			</View>
		);
	}
}
