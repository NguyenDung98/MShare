

export var userFriends = {
    id: '123', //id user
    friends: {
        data:
            [
                {
                    id: '1', //id friend 1
                    name: 'user1',
                    uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/25/13/cat-getty_0.jpg?w968h681',  //add uri (avatar uri) state in userFriends
                    online: true,     //add online state in userFriends
                    listening : true,
                    item: {          // add item in state userFriends
                        id: '1',
                        artwork: 'a',
                        artist: 'a',
                        title: 'firsr=1'
                    }
                },
                {
                    id: '2', //id friend 2
                    name: 'user2',
                    uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/25/13/cat-getty_0.jpg?w968h681',
                    online: true,
                    listening : false,
                    item: {}
                },
                {
                    id: '3', //id friend 3
                    name: 'user3',
                    uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/25/13/cat-getty_0.jpg?w968h681',
                    online: false,
                    listening: false,
                    item: {}
                },
            ]
    },
}
