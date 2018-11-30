import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

const CreateMissionMapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  latlng: {
    width: 200,
    alignItems: 'stretch',
  },

  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },

  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  modalView: {
    flex: 0.45,
    borderRadius: 2,
    marginTop: height * 0.25,
    marginHorizontal: 10,
 },
});

export default CreateMissionMapStyle;