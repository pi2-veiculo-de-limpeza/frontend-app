import React from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  ScrollView } from 'react-native';
import styles from '../styles/GeneralStyles';
import CreateMissionMapStyle from '../styles/CreateMissionMapStyle';
import DefaultButton from "../components/DefaultButton";
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import MapView, { MAP_TYPES, Marker, ProviderPropType } from 'react-native-maps';
import rover from '../images/rover.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00008; // Used to set initial map zoon
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MissionAccompaniment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isInMission: false,
      region: {
        latitude: -15.989938,
        longitude: -48.044018,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markerPosition: {
        latitude: -15.989938,
        longitude: -48.044018,
      },
      intervalId: null,
    }
    this.getRobotPosition = this.getRobotPosition.bind(this);
  }

  // TODO: Check if it has a mission to display on map
  componentDidMount(){
    this.getRobotPosition()
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId)
  }

  // TODO: Implement with API request
  getRobotPosition(){
    let long = this.state.markerPosition.longitude + 0.000005
    let lat = this.state.markerPosition.latitude + 0.000005
    this.setState({
      markerPosition: {
        latitude: lat,
        longitude: long,
      },
    })
    console.log("MARKER UPDATED")
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.mission.name,
      headerStyle: {
        backgroundColor: '#53A9F6',
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        alignSelf:'center',
        fontWeight: 'bold',
        fontSize: 35,
      },
    }
  };


  startMission(){
    // TODO: iniciar mapeamento do terreno
    this.setState({ isInMission:true })
    let updateMarker = setInterval(this.getRobotPosition, 2000);
    this.setState({ intervalId: updateMarker })
  }

  stopMission(){
    // TODO: atualizar API
    this.setState({ isInMission:false })
    clearInterval(this.state.intervalId)
  }

  renderMissionButton(){
    let button

    if(!this.state.isInMission){
      button = <DefaultButton
        type={"green"}
        text={"Iniciar Missão"}
        padding={15}
        onPress={() => this.startMission()}
      />
    } else {
      button = <DefaultButton
        type={"red"}
        text={"Cancelar missão"}
        padding={15}
        onPress={() => this.stopMission()}
      />
    }

    return button
  }

  render() {
    var missionButton = this.renderMissionButton()

    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          
          {/* PLACEHOLDER do mapa */}
          <View style={styles.mapStyle}>
            <MapView
              initialRegion={this.state.region}
              style={CreateMissionMapStyle.map}
              mapType={MAP_TYPES.SATELLITE}
              scrollEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: this.state.markerPosition.latitude,
                  longitude: this.state.markerPosition.longitude,
                }}
                image={rover}
                >
              </Marker>
            </MapView>
          </View>
          {missionButton}

        </ScrollView>
      </ImageBackground>
      )
    }
  }

export default MissionAccompaniment;
