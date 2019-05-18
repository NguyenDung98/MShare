import React, {Component} from 'react';
import {
	View,
	Text,
	StatusBar,
	StyleSheet,
	TouchableNativeFeedback,
	Image,
	Animated,
	FlatList,
	ScrollView
} from 'react-native';
import {colors} from '../utils/colors';
import {SCREEN_HEIGHT, AVATAR_MARGIN_LEFT, AVATAR_SIZE, SCREEN_WIDTH} from '../utils/constants';
import Ionicons from "react-native-vector-icons/Ionicons";

import Avatar from '../components/Avatar';
import {SCALE_RATIO} from '../constants/constants';
import IconButton from "../components/IconButton";
import {ItemTimeLine} from '../components/Item';
import store from '../store';

const default_avt = require('./../imgs/default-avatar.png')
const BACK_BUTTON_SIZE = 40;

// const keyExtractor = item => item.item.id;

export default class ProfileScreen extends Component {
	static navigationOptions = {
		header: null,
		headerStyle: {
			height: 0,
			width: 0,
		}
	};

	state = {
		avatarUrl: null,
		name: null,
		sharingSongs: [],
	};

	componentWillMount() {
		const {navigation: {state: {params}}} = this.props;
		const {type, userID} = params;

		if (type === 'friend') {
			const {userFriends} = store.getState();
			const {name, avatarUrl, sharingSongs} = userFriends[userID];

			this.setState({
				name,
				avatarUrl,
				sharingSongs,
			})
		} else {
			const {user: {name, avatarUrl}, sharingSongs} = store.getState();
			console.log(['sharingSong', sharingSongs])
			this.setState({
				name,
				avatarUrl,
				sharingSongs,
			})
		}
	}

	_onLayout = ({nativeEvent: {layout: {width}}}) => {
		if (width > SCREEN_WIDTH *
			3 + 0.6 && !this.state.animation) {

		}
	};

	

	_renderItem = ({item}) => (
		<ItemTimeLine
			item={item}
		/>
	);

	render() {
		const {navigation: {goBack}} = this.props;
		const {avatarUrl, name, sharingSongs} = this.state;
		console.log(sharingSongs)
		return (
			<View>
				<StatusBar
					backgroundColor={colors.transparent}
					translucent
				/>
				<ScrollView>
					<View>
						<Image
							source={{uri: avatarUrl !== '' ? avatarUrl : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}}
							style={{height: SCREEN_HEIGHT * 0.3, width: '100%'}}
							resizeMode={'cover'}
						/>
						<View style={styles.overlayStyle}>
							<IconButton
								name={'ios-arrow-round-back'}
								IconType={Ionicons}
								iconSize={BACK_BUTTON_SIZE}
								ButtonType={TouchableNativeFeedback}
								style={styles.backBtnStyle}
								buttonProps={{
									background: TouchableNativeFeedback.Ripple(colors.lighterGrey, true)
								}}
								color={colors.white}
								onPress={() => goBack()}
							/>
							<View style={[styles.textContainerStyle, styles.customTitleContainerStyle]}>
								<Animated.Text
									onLayout={this._onLayout}
									numberOfLines={1}
									style={{marginLeft: 20 * SCALE_RATIO, fontSize: 20, color: 'white', fontWeight : 'bold', textShadowOffset : {width: 1,height: 2},  textShadowColor : 'gray', textShadowRadius : 5}}
								>
									{name !== '' ? name : 'User'}
								</Animated.Text>

							</View>
						</View>
					</View>
					<View style={styles.avatarContainerStyle}>
						<Avatar
							imageStyle={styles.avatarStyle}
							width={AVATAR_SIZE}
							uri={avatarUrl !== '' ? avatarUrl : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}
							elevation={2}
						/>
						<View>
						</View>

					</View>
					{sharingSongs.length !== 0 ? 
					<FlatList
						data={sharingSongs}
						renderItem={this._renderItem}
						keyExtractor={(item, index) => index.toString()}
					/>
					: 
					<View style={{ alignItems : 'center', justifyContent: 'center'}}>
					<Text style = {{opacity : 40}}>Không có dữ liệu hiển thị</Text>
					</View>
					}
				</ScrollView>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	overlayStyle: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.brightRed,
		opacity: 0.8,
		height: SCREEN_HEIGHT * 0.3,
	},
	backBtnStyle: {
		marginTop: SCALE_RATIO * 50,
		marginLeft: 10,
		width: BACK_BUTTON_SIZE * 0.7,
		height: BACK_BUTTON_SIZE * 0.7,
		borderRadius: BACK_BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',

	},
	textContainerStyle: {
		position: 'absolute',
		bottom: 10,
		left: AVATAR_SIZE + AVATAR_MARGIN_LEFT + 5,
		overflow: 'hidden'
	},
	titleStyle: {
		fontSize: 25,
		color: colors.white,
		fontWeight: '700',
	},
	subTitleStyle: {
		fontSize: 15,
		color: colors.white
	},
	avatarContainerStyle: {
		left: AVATAR_MARGIN_LEFT,
		marginTop: -AVATAR_SIZE * 0.55,
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
	},
	avatarStyle: {
		borderRadius: AVATAR_SIZE / 2,
	},
});
