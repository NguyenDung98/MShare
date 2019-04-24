import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { saveAccessToken, getAccessToken, saveAvt } from '../utils/asyncStorage';
import firebase from './../firebase/firebase';
import { SCALE_RATIO } from '../constants/constants';
import { Button } from 'native-base'
export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.checkExistToken()
  };

  async checkExistToken() {
    const token = await getAccessToken();
    if (token !== '') {
      this.props.navigation.navigate('TabScreen');
    }
  }

  _fbAuth(self) {
    LoginManager.logInWithReadPermissions(["public_profile", "user_friends", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              saveAccessToken(data.accessToken.toString());
              // const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              // firebase.auth().signInAndRetrieveDataWithCredential(credential)
              console.log(getAccessToken())
              // Luu avatar
              fetch('https://graph.facebook.com/me?fields=picture&access_token=' +  data.accessToken)
              .then((response) => response.json())
              .then((responseJson) => {
                  console.log("===============PICTURE===========")
                  console.log(responseJson)
                  saveAvt(responseJson.picture.data.url)
              })
              .catch((error) => {
                  console.error(error);
              });
              //Kiem tra Id co ton tai k
              fetch('https://graph.facebook.com/me?fields=id,name&access_token=' + data.accessToken)
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("===============INFO USER==========")
                  console.log(responseJson)
                  firebase.database().ref().child('Users/' + responseJson.id).once('value', snapshot => {
                    if (!snapshot.exists()) {
                      firebase.database().ref('Users/' + responseJson.id).set({
                        name: responseJson.name,
                        state: true
                      }).then((data) => {
                        //success callback
                        console.log('data ', data)
                      }).catch((error) => {
                        //error callback
                        console.log('error ', error)
                      })
                    }
                  })
                })
                .catch((error) => {
                  console.error(error);
                });

              self.props.navigation.navigate("TabScreen");
            }
          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );

    // LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
    //   .then((result) => {
    //     console.log('RESULT ' + result);
    //     if (result.isCancelled) {
    //       return Promise.reject(new Error('the user cancle request'))
    //     }
    //     console.log('Login success: ' + result.grantedPermissions.toString())
    //     return AccessToken.getCurrentAccessToken();
    //   })
    //   .then((data) => {
    //     const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    //     return firebase.auth().signInAndRetrieveDataWithCredential(credential);
    //   })
    //   .then((currentUser) => {
    //     console.log(JSON.stringify(currentUser));
    //     this.props.navigation.navigate('TabScreen');

    //   }).catch((error) => {
    //     console.log('ERROR ' + error);
    //     Alert.alert(
    //       'Sorry',
    //       '' + error,
    //       [
    //         { text: 'OK', onPress: () => console.log('OK Pressed') },
    //       ],
    //       { cancelable: false }
    //     )
    //   })


  }

  render() {
    return (
      <View style={styles.constainer}>
        <View style={styles.form}>
          <Button block primary style={styles.button} onPress={() => { this._fbAuth(this); }} >
            <Text style={{ color: 'white', alignItems: 'center' }}>Facebook login</Text></Button>
          {/* <Button style={styles.button} /> */}
          <Text  >Hoặc</Text>
          <Button block info style={styles.button} onPress={() => { this.props.navigation.navigate('TabScreen') }} >
            <Text style={{ color: 'white', alignItems: 'center' }}>Tiếp tục</Text></Button>
        </View>
      </View>

    );
  }
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1
  },
  form: {
    height: 200 * SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'pink',
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 100 * SCALE_RATIO,
    marginRight: 100 * SCALE_RATIO
  }
})
