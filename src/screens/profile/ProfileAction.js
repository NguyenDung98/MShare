
export function getProfile(token = '', self) {
    return fetch('https://graph.facebook.com/me?fields=name,picture.height(144)&access_token=' + token)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("===============PROFILE===========")
            console.log(responseJson)
            self.setState({
                name: responseJson.name,
                avt: responseJson.picture.data.url,
            })
        })
        .catch((error) => {
            console.error(error);
        });
}