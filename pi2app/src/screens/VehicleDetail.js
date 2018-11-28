import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: [],
      isLoading: false,
      vehicleInfo: {},
    }
  }

  componentWillMount(){
    const { params } = this.props.navigation.state
    this.setState({ vehicleInfo: params.vehicle})
  }

  componentDidMount(){
    this.getAllMissions()
  }

  // Get all missions registered
  getAllMissions = async () => {
    this.setState({isLoading: true});
    const details = this.state.vehicleInfo
    await axios.get(`${process.env.BACKEND}/vehicles/` + details.vehicleId + '/all_missions_vehicle')
    .then(response => {
      this.setState({ missions: response.data })
      this.setState({ isLoading: false })
    })
    .catch((error) => {
    this.setState({isLoading: false});
    console.log('Error: ' + error)      
    })
  }

  newMission(){
    // TODO: iniciar mapeamento do terreno
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

  render() {
    const {params} = this.props.navigation.state

    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          <VehicleCard
            key={1}
            vehicle={params.vehicle}
          />
          <DefaultButton
            type={"blue"}
            text={"Editar Robô"}
            padding={15}
            onPress={ () => this.props.navigation.navigate("VehicleEdit", {vehicle: params.vehicle}) } 
          />

          <View style={styles.simpleTextView}>
            <Text style={styles.simpleText}>
              Missões
            </Text>
          </View>

          <View style={styles.missionNameView}>
            {this.state.missions.map((mission, index) => {
              return (
                <TouchableHighlight
                style={styles.missionNameTouch}
                key={index}
                onPress={ () => this.props.navigation.navigate("MissionAccompaniment", { mission: mission})}>
                  <Text style={styles.missionTextName}>
                    {mission.name}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </View>

          <DefaultButton
            type={"green"}
            text={"Nova missão"}
            padding={15}
            onPress={() => this.newMission()}
          />

        </ScrollView>
      </ImageBackground>
      )
    }
  }

export default VehicleDetail;