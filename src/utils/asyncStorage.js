import { AsyncStorage } from 'react-native'

export const getAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@token08022019:key');
        return (token !== null) ? token : '';
    } catch (error) {
        return '';
    }
};

export const clearAccessToken = async () => {
    try {
        await AsyncStorage.setItem('@token08022019:key', '');
    } catch (e) {
        console.log(e);
    }
};


export const saveAccessToken = async (token = '') => {
    try {
        await AsyncStorage.setItem('@token08022019:key', token);
    } catch (e) {
        console.log(e);
    }
};

// export const saveAvt = async (avt = '') => {
//     try {
//         await AsyncStorage.setItem('@avatar08022019:key', avt);
//     } catch (e) {
//         console.log(e);
//     }
// };

// export const getAvtURL = async () => {
//     try {
//         const token = await AsyncStorage.getItem('@avatar08022019:key');
//         return (avt !== null) ? avt : '';
//     } catch (error) {
//         return '';
//     }
// };

