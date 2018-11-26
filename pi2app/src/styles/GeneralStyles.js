import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    initialBackgroundImage: {
      flex: 1,
      width: null,
    },
  
    initialScreen: {
      flex: 1,
      backgroundColor: 'transparent',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
    },
  
    loginButton: {
      width: 320,
      height: 65,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF9500',
      borderRadius: 10,
      marginBottom: 60,
    },
  
    buttonText: {
      fontSize: 20,
      color: 'white',
    },

    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
  
    registerButton: {
      width: 320,
      height: 65,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF9500',
      borderRadius: 10,
    },
  
    titleText: {
      fontSize: 60,
      fontWeight: 'bold',
      color: 'white',
      marginTop: 140,
    },

    greenButton: {
      width: 140,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#55C583',
      borderRadius: 10,
      marginBottom: 20,
    },

    redButton: {
      width: 170,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E94B74',
      borderRadius: 10,
      marginBottom: 20,
    },

    blueButton: {
      width: 170,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4885ed',
      borderRadius: 10,
      marginBottom: 20,
    },

    grayButton: {
      width: 140,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#858585',
      borderRadius: 10,
      marginBottom: 20,
    },

    vehicleScrollView: {
      paddingVertical: 20
    }
});

export default styles;