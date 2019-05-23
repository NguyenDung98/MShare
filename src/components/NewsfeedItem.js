import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Song from './Song';
import { SCALE_RATIO } from '../constants/constants';
import { getSongsDetail } from '../actions';
import { playSong } from '../utils/TrackUtils';
// import navigate from '../service/navigationService'

export class ItemNewsfeed extends React.Component {
    // console.log(item)
    // const { name, uri, time } = item.user;
    // const { artwork, artist, title } = item.item;

    constructor(props) {
        super(props);
        this.state = {
            track: '',
            sharingSongs: '',
            name: '',
            avatarUrl: '',
            id :'',
            selectedFriend : ''
        }
    }

    _getTrack = async (item) => {
        return (await getSongsDetail([item]))[0];
    }

    _moveToProfile = (userID) => {
		const {selectedFriend} = this.state;
		const {navigation: {navigate}} = this.props;

		navigate('Profile', {
			userID: userID ? userID : selectedFriend,
			type: 'friend',
		});
	};


    componentWillMount() {
        const item = this.props.item
        // console.log(['item', item])
        const { id, name, avatarUrl, sharingSongs } = item;
        this.setState({
            name,
            avatarUrl,
            sharingSongs,
            id,
            selectedFriend : id
        })
        if (sharingSongs) {
            console.log(sharingSongs);
            const _id = sharingSongs[0];
            console.log(['id', _id])
            this._getTrack(_id).then((result) => {
                this.setState({ track: result })
            })
        }
    }

    render() {
        const { artist, artwork, title } = this.state.track;
        console.log(this.state.track)
        return (
            <View>
            {this.state.track ?
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this._moveToProfile(this.state.id)}>
                <View style={styles.container2} >
                    <Image source={{ uri: this.state.avatarUrl }} style={styles.avt}  />
                    <Text style={styles.name}>{this.state.name}</Text>
                    {/* <View /> */}
                </View>
                </TouchableOpacity>
                <View style={styles.container3}>

                    <View style={styles.container4}>
                        {/* <Text style={styles.music} numberOfLines={1}>{time}</Text> */}
                    </View>

                    </View>
                    <TouchableOpacity style={styles.tabmusic}>
                        <Song
                            uri={artwork}
                            subTitle={artist}
                            showMoreButton={false}
                            title={title}
                            onPress={async () => await playSong(this.state.track)}
                            style={{ paddingBottom: 10 }}
                        />
                    </TouchableOpacity>
                </View>

            : <View></View>}
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20 * SCALE_RATIO,
        marginLeft: 25 * SCALE_RATIO,
        marginBottom: 20 * SCALE_RATIO,
        marginRight: 25 * SCALE_RATIO,
        padding: 8 * SCALE_RATIO,
        borderColor: '#f2f2f2',
        borderRadius: 10,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor : 'white'
    },
    avt: {
        width: 80 * SCALE_RATIO,
        height: 80 * SCALE_RATIO,
        borderRadius: 50,
        borderColor: "gray",
        borderWidth:1
    },
    container2: {
        flexDirection: 'row',
        alignItems:'center',

    },


    name: {
        fontSize: 17,
        color: 'black',
        marginLeft: 20 * SCALE_RATIO
    },
    music: {
        fontSize: 11,
        color: 'gray',
        width: 480 * SCALE_RATIO,
    },
    container3: {
        flex: 1,
        marginLeft: 20 * SCALE_RATIO,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    container4: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container5: {
        flexDirection: 'row'
    },
    play: {
        flex: 1 / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabmusic: {
        marginTop: 10 * SCALE_RATIO,
        // marginLeft: -85 * SCALE_RATIO,
        margin: 20 * SCALE_RATIO,
        borderWidth: 1,
        borderColor: '#f2f2f2',
    }
})
