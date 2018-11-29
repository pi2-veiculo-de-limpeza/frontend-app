import React from 'react';
import {
  Text, 
  View,
  Alert,
  ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';
import DialogInput from 'react-native-dialog-input';


class VehicleDetail extends React.Component {
  state = { 
    token: '',
    isInMission: true,
    onManual: false,
    navigation: undefined,
    isDialogVisible: false
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
      headerRight:
        <Button
          title={"edit"}
          clear={true}
          onPress={ () => navigation.navigate("VehicleEdit", {vehicle: navigation.state.params.vehicle}) } 
          buttonStyle={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "transparent",
          }}
          containerStyle={{ alignSelf:'center' }}
        />
    }
  };


  newMission(){
    // TODO: iniciar mapeamento do terreno
    this.setState({ isInMission:false })
  }

  stopMission(){
    // TODO: atualizar API
    this.setState({ isInMission:true })
  }

  startManual(){
    // TODO: iniciar conexão bluetooth, joystick para controle remoto do Veículo
    // this.setState({ onManual:true })
    this.setState({ isDialogVisible:true })
  }

  beginJoystick(ip_address){
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

  renderManualButton(){    

    let button

    if(this.state.onManual == false){
      button = <DefaultButton
        type={"green"}
        text={"Remoto"}
        padding={15}
        onPress={() => this.startManual()}
      />
    }else {
      button = <DefaultButton
        type={"red"}
        text={"Sair do Manual"}
        padding={15}
        onPress={() => this.stopManual()}
      />
    }

    return button
  }

  renderMissionButton(){

    let button

    if(this.state.isInMission){
      button = <DefaultButton
        type={"green"}
        text={"Nova missão"}
        padding={15}
        onPress={() => this.newMission()}
      />
    }else {
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

    var screen;
    const {params} = this.props.navigation.state;
    this.state.navigation = this.props.navigation;

    if (this.state.isInMission) {
      screen = (
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          {this.renderMissionButton()}
        </ScrollView>
      )
    }else{
      screen = (
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          
          {/* PLACEHOLDER do mapa */}
          <View style={{ 
            flex: 1, 
            alignItems: 'center',
            height: 250,
            paddingVertical: 20,
            marginHorizontal: 10,
            backgroundColor: "gray" }}>
            <Text>Mapa :)</Text>
          </View>

          <VehicleCard
            key={1}
            vehicle={params.vehicle}
          />

          {this.renderManualButton()}
          {this.renderMissionButton()}

          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Conexão remota"}
            message={"Entre com o IP de rede do veículo"}
            hintInput ={"192.168.1.20"}
            submitInput={ (inputText) => {this.beginJoystick(inputText)} }
            closeDialog={ () => {this.setState({ isDialogVisible:false })}}>
          </DialogInput>


        </ScrollView>
      )
    }

    return screen
  }
}

export default VehicleDetail;
