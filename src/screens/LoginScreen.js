import React, { Component } from 'react';
import { View, Button , Text} from 'react-native';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager, AccessToken } from "react-native-fbsdk";
 
export default class Login extends Component{
  constructor(props){
    super(props);
  }
  _fbAuth(self){
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
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
              console.log(data.accessToken.toString());
            }
          );
          self.props.navigation.navigate("TabScreen");
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
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
