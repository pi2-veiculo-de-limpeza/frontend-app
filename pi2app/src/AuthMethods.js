import { AsyncStorage } from 'react-native';

export const onSignIn = async (token, id) => {
  try{
    await AsyncStorage.setItem("tokenKey", token);
    await AsyncStorage.setItem("idKey", id);
    console.log(token)
    console.log('Saved on Storage.')
  }
  catch(exception) {
    console.log('Fail to Save on Storage.')
  }
}

export const onSignOut = async () => {
  try {
    await AsyncStorage.removeItem("tokenKey");
    await AsyncStorage.removeItem("idKey");

    console.log(getUserToken())
    
    console.log('Storage Removed.')
    return true;
  }
  catch(exception) {
    console.log('Fail to Remove Storage.')
    return false;
  }
}

export const isSignedIn = async () => {
  try{
    const token = await AsyncStorage.getItem("tokenKey");
    return (token !== null) ? true : false;
  }
  catch(exception){
    console.log('Fail to check if is signed in.')
    return false;
  }
  
};

export const getUserToken = async () => {
  try{
    const token = await AsyncStorage.getItem("tokenKey");
    return (token !== null) ? token : null;
  }
  catch(exception){
    console.log('Fail to get user token.')
    return null;
  }
};

export const getUserId = async () => {
  try{
    const id = await AsyncStorage.getItem("idKey");
    return (id !== null) ? id : null;
  }
  catch(exception){
    console.log('Fail to get user token.')
    return null;
  }
};