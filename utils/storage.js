import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // TODO - handle error (via toast or smthg)
    }
}

export const retriveData = async (key) => {
    try{
        return await AsyncStorage.getItem(key);
    }catch(error){
        // TODO - handle error
        return null;
    }
}
