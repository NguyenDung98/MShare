import React, {Component} from 'react';
import {View, Text, StatusBar, StyleSheet, TouchableNativeFeedback, Image, Animated, ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {SCREEN_HEIGHT, AVATAR_MARGIN_LEFT, AVATAR_SIZE, SCREEN_WIDTH} from '../../utils/constants';
import Ionicons from "react-native-vector-icons/Ionicons";
import Avatar from '../../components/Avatar';
import {SCALE_RATIO} from '../../constants/constants';
import {getProfile} from './ProfileAction';
import {getAccessToken} from '../../utils/asyncStorage';
import IconButton from "../../components/IconButton";

const default_avt = require('./../../imgs/default-avatar.png')
const BACK_BUTTON_SIZE = 40;
export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			avt: '',
			token: 'EAAFzZCwdP8KUBAJnTWsorZBKOmXJF7d96FGmHeFXyAZALoZAfgZCZBa2ot7GbLW515LajlZAAb3EnfDdpkNFcUH8428vNNQVfxCFxXSgJ1wnhwVkpNtVaIkfgbkcdllQG3xvjJZALys5IUQsiR4UZAlQja2CYDMDjHloCLJRSy3A9E4KUAFBN2qi5sz0UOI4ls4oH0UTbgNDsZBqqVMQZAbZBmXo73xSdFpSJTHypCI23pZCXMwZDZD'
		};
	}

	static navigationOptions = {
		header: null,
		headerStyle: {
			height: 0,
			width: 0,
		}
	};

	componentWillMount() {
		const {navigation: {state: {params}}} = this.props;

		_onLayout = ({nativeEvent: {layout: {width}}}) => {
			if (width > SCREEN_WIDTH *
				3 + 0.6 && !this.state.animation) {
				// Animated.loop(Animated.timing(this.titlePosition, {
				//   toValue: -SCREEN_WIDTH * 1.18,
				//   duration: 10000,
				//   easing: Easing.linear(),
				//   useNativeDriver: true,
				// })).start()
			}
		};

	}

	componentDidMount() {
		// console.log("==========Get profile===========")
		// getProfile(this.state.token, this);
		// console.log(this.state.avt);
		return fetch('https://graph.facebook.com/me?fields=name,picture.height(148)&access_token=' + this.state.token)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log("===============PROFILE===========")
				console.log(responseJson)
				this.setState({
					name: responseJson.name,
					avt: responseJson.picture.data.url,
				})
			})
			.catch((error) => {
				console.error(error);
			});
	}


	render() {
		const {navigation: {goBack}} = this.props;
		return (
			<View>
				<StatusBar
					backgroundColor={colors.transparent}
					translucent
				/>
				<ScrollView>
					<View>
						<Image
							source={{uri: this.state.avt !== '' ? this.state.avt : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}}
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
									onLayout={_onLayout}
									numberOfLines={1}
									style={{marginLeft: 20 * SCALE_RATIO}}
								>
									{this.state.name !== '' ? this.state.name : 'User'}
								</Animated.Text>

							</View>
						</View>
					</View>
					<View style={styles.avatarContainerStyle}>
						<Avatar
							imageStyle={styles.avatarStyle}
							width={AVATAR_SIZE}
							uri={this.state.avt !== '' ? this.state.avt : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}
							elevation={2}
						/>
						<View>
						</View>

					</View>
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
		top: -AVATAR_SIZE * 0.55,
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
	},
	avatarStyle: {
		borderRadius: AVATAR_SIZE / 2,
	},
});
