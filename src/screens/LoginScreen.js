import React, { Component } from 'react';
import { View, Button , Text, Alert} from 'react-native';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { saveAccessToken, getAccessToken } from '../utils/asyncStorage';
 
export default class Login extends Component{
  constructor(props){
    super(props);
  }
  _fbAuth(self){
    LoginManager.logInWithReadPermissions(["public_profile", "user_friends"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(
            (data)=>{
              saveAccessToken(data.accessToken.toString());
              console.log(getAccessToken())
              
              // console.log(data.accessToken.toString());
              self.props.navigation.navigate("TabScreen");
 
            }
          );
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
    // LoginManager.logInWithReadPermissions(['public_profile', 'user_friends'])
    //                 .then((result) => {
    //                     console.log('RESULT ' + result);
    //                     if(result.isCancelled){
    //                         return Promise.reject(new Error('the user cancle request'))
    //                     }
    //                     console.log('Login success: ' + result.grantedPermissions.toString())
    //                     return AccessToken.getCurrentAccessToken();
    //                 })
    //                 .then((data) =>{    
    //                     const firebase = require('firebase');
    //                     const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    //                     return firebase.auth().signInAndRetrieveDataWithCredential(credential);
    //                 })
    //                 .then((currentUser) =>{
    //                     console.log(JSON.stringify(currentUser));
    //                     // this.props.navigation.navigate('TabScreen');

    //                 }).catch((error) => {
    //                     console.log('ERROR '+  error);
    //                     Alert.alert(
    //                         'Sorry',
    //                         '' + error,
    //                         [
    //                         {text: 'OK', onPress: () => console.log('OK Pressed')},
    //                         ],
    //                         { cancelable: false }
    //                     )
    //                 })
    // LoginManager.logInWithReadPermissions(["public_profile", "user_friends"]).then(
    //   function(result) {
    //     if (result.isCancelled) {
    //       console.log("Login cancelled");
    //     } else {
    //       console.log(
    //         "Login success with permissions: " +
    //           result.grantedPermissions.toString()
    //       );
    //     }
    //   },
    //   function(error) {
    //     console.log("Login fail with error: " + error);
    //   }
    // );
  }
  render() {
    return (
      <View>
          <Button onPress={()=> {this._fbAuth(this);}} title='FB Login' />
          <Text>Or</Text>
          <Button color='green' onPress={() => {this.props.navigation.navigate('TabScreen')}}  title='Continue'/>
      </View>
    );
  }
};
