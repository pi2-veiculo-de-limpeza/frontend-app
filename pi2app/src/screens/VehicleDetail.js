import React from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  ScrollView } from 'react-native';
import styles from '../styles/GeneralStyles';
import CreateMissionMapStyle from '../styles/CreateMissionMapStyle';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import MapView, { MAP_TYPES, Marker, ProviderPropType } from 'react-native-maps';
import rover from '../images/rover.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00008; // Used to set initial map zoon
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isInMission: false,
      onManual: false,
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
    let updateMarker = setInterval(this.getRobotPosition, 2000);
    this.setState({ intervalId: updateMarker })
    console.log("INTERVAL ID: " + updateMarker)
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId)
    console.log("COMPONENTE DESMONTADO")
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
    console.log("Marker Updated!")
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.vehicle.name,
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


  newMission(){
    // TODO: iniciar mapeamento do terreno
    this.setState({ isInMission:true })
    this.props.navigation.navigate("MissionDefinition");
  }

  stopMission(){
    // TODO: atualizar API
    this.setState({ isInMission:false })
  }

  startManual(){
    // TODO: iniciar conexão bluetooth, joystick para controle remoto do Veículo
    this.setState({ onManual:true })
  }

  stopManual(){
    this.setState({ onManual:false })
  }

  // renderManualButton(){

  //   let button

  //   if(this.state.onManual == false){
  //     button = <DefaultButton
  //       type={"green"}
  //       text={"Modo Manual"}
  //       padding={15}
  //       onPress={() => this.startManual()}
  //     />
  //   }else {
  //     button = <DefaultButton
  //       type={"red"}
  //       text={"Sair do Manual"}
  //       padding={15}
  //       onPress={() => this.stopManual()}
  //     />
  //   }

  //   return button
  // }

  renderMissionButton(){

    let button

    if(!this.state.isInMission){
      button = <DefaultButton
        type={"green"}
        text={"Nova missão"}
        padding={15}
        onPress={() => this.newMission()}
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
    const {params} = this.props.navigation.state

    var missionButton = this.renderMissionButton()

    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          
          {/* PLACEHOLDER do mapa */}
          <View style={{ 
            flex: 1, 
            alignItems: 'center',
            height: 250,
            paddingVertical: 20,
            marginHorizontal: 10,
            backgroundColor: "gray" }}>
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

          <VehicleCard
            key={1}
            vehicle={params.vehicle}
          />
          <DefaultButton
            type={"blue"}
            text={"Teste"}
            padding={15}
            onPress={ () => this.getRobotPosition() } 
          />
          <DefaultButton
            type={"blue"}
            text={"Editar Robô"}
            padding={15}
            onPress={ () => this.props.navigation.navigate("VehicleEdit", {vehicle: params.vehicle}) } 
          />
          {missionButton}

        </ScrollView>
      </ImageBackground>
      )
    }
  }

export default VehicleDetail;