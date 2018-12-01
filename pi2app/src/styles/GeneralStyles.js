import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
  initialBackgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: null,
  },

  vehicleScrollView: {
    paddingVertical: 5
  },

  initialScreen: {
    flex: 1,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
  },

  initialScreenTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: height * 0.2,
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

  yellowButton: {
    width: 170,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd800',
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

  simpleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  simpleTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#328A2E',
    margin: 10,
    borderRadius: 2,
  },

  missionScrollView: {
    paddingVertical: 5
  },

   missionNameView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'rgba(200, 200, 200, 0.4)',
    marginHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  
  missionNameTouch: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 45,
    marginVertical: 10,
    paddingVertical: 10,
    justifyContent: 'flex-start'
  },

  missionTextName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#686868',
    textAlign: 'center',
  },

  mapStyle: {
    flex: 1, 
    alignItems: 'center',
    height: height * 0.7,
    paddingVertical: 20,
    marginHorizontal: 10,
    backgroundColor: "gray"
  },
});

export default styles;