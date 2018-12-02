import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
  ScrollView } from 'react-native';
import axios from 'axios';
import { Button, Card } from 'react-native-elements';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';
import Dialog from "react-native-dialog";
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';


class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: [],
      isLoading: false,
      vehicleInfo: {},
      navigation: undefined,
      isDialogVisible: false,
      ip: ''
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
      console.log('MISSIONS: ' + JSON.stringify(response.data))
    })
    .catch((error) => {
    this.setState({isLoading: false});
    console.log('Error: ' + error)      
    })
  }

  newMission(){
    this.props.navigation.navigate("MissionDefinition", { vehicle: this.state.vehicleInfo })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Missões',
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

  startManual(){
    this.setState({ isDialogVisible:true })
  }

  handleIp(ipAddressText){
    this.setState({ip: ipAddressText})
    console.log(this.state.ip)
  }

  beginJoystick = () => {

    ip_address = this.state.ip

    var ws = new WebSocket(`ws://${ip_address}:8000`);
    ws.onopen = () => {
      // connection opened
      ws.send('Remote activated'); // send a message
      this.state.navigation.navigate("Joystick", {vehicle: this.state.navigation.state.params.vehicle, websocket: ws})
      this.setState({ isDialogVisible:false })
    };
    ws.onclose = (e) => {
      this.showAlert('Error', 'Não foi possível se conectar com o veículo.')
      console.log(e.code, e.reason);
    };
  }

  showAlert(title, body){
    Alert.alert(
      title,
      body,
      [
        {text: 'Ok', onPress: () => console.log('Ok pressed')},
      ],
      { cancelable: false }
    )
  }

  stopManual(){
    this.setState({ onManual:false })
  }

  render() {
    const { params } = this.props.navigation.state;
    this.state.navigation = this.props.navigation;

    if(this.state.isLoading == true){
      return (
        <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator}/>
        </ImageBackground>

      )
    } else {
      return (
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <ScrollView style={styles.missionNameView}>
        {this.state.missions.length == 0 &&
            <Card
              title={ "Nenhuma Missão cadastradada!" }
              containerStyle={{borderRadius: 10, paddingVertical: 10}}
              >
              <Text style={{color: 'black', textAlign: 'center'}}>
                Suas missões cadastradas aparecerão aqui.
              </Text>
            </Card>
            }
          <View>
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

          <View>
            <Dialog.Container visible={this.state.isDialogVisible}>
              <Dialog.Title>LAN IP address</Dialog.Title>
              <Dialog.Input text={this.state.ip} onChangeText={(ip) => this.handleIp(ip)}
              ></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={() => {this.setState({isDialogVisible: false})} } />
              <Dialog.Button label="Submit" onPress={this.beginJoystick} />
            </Dialog.Container>
          </View>

        </ScrollView>
        <View style={{flexDirection: 'row'}}>
            <DefaultButton
              type={"blue"}
              text={"Editar Robô"}
              padding={15}
              onPress={ () => this.props.navigation.navigate("VehicleEdit", {vehicle: params.vehicle}) } 
            />
            <DefaultButton
              type={"green"}
              text={"Remoto"}
              padding={15}
              onPress={() => this.startManual()}
            />
          </View>
      </ImageBackground>
      )
    }
  }
}

export default VehicleDetail;