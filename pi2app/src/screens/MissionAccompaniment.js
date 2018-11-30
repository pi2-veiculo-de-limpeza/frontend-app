import React from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  ScrollView } from 'react-native';
import axios from 'axios';
import { getUserToken } from "../AuthMethods";
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
      userToken: '',
      isInMission: false,
      garbageVolume: 'Indisponível',
      garbageWeight: 'Indisponível',
      isLoading: true,
      region: {
        latitude: -15,
        longitude: -48,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markerPosition: {
        latitude: -15,
        longitude: -48,
      },
      intervalId: null,
    }
    this.getRobotPosition = this.getRobotPosition.bind(this);
  }

  componentWillMount(){
    getUserToken().then(res => this.setState({ userToken: res }))
      .catch(err => alert("Erro"));
  }

  // TODO: Check if it has a mission to display on map
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("LATITUDE: " + position.coords.latitude)
      console.log("LONGITUDE: " + position.coords.longitude)
      this.setState({
        markerPosition: {
          ...this.state.markerPosition,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        isLoading: false
      })
      this.setState({
        region: {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        isLoading: false
      })
    },
    (error) => console.log("error: " + error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.getRobotInfo()

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

  getRobotInfo = async () => {
    // wait 1s for db get userToken
    if (this.state.userToken == undefined || this.state.userToken == ""){
      await sleep(1000);
    }
    const mission = this.props.navigation.state.params.mission

    axios.all([
      axios.get(`${process.env.BACKEND}/volume?mission_id=/` + mission._id.$oid, { headers: { Authorization: this.state.userToken } }),
      axios.get(`${process.env.BACKEND}/peso?mission_id=/` + mission._id.$oid, { headers: { Authorization: this.state.userToken } })
      ])
      .then(axios.spread(function (volumeResponse, weightResponse) {
        if(volumeResponse.data == '' || weightResponse == ''){
          console.log("Dado não disponível")
        } else {
          this.setState({ garbageVolume: volumeResponse.data })
          this.setState({ garbageWeight: weightResponse.data })
        }
      })
    )
  };

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
    
    if(this.state.isLoading == true){
      return (
        <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator}/>
        </ImageBackground>
      )
    } else {
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
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default MissionAccompaniment;
