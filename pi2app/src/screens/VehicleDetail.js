import React from 'react';
import {
  Text, 
  View,
  ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';


class VehicleDetail extends React.Component {
  state = { 
    token: '',
    isInMission: true,
    onManual: false,
    navigation: undefined
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
    this.state.navigation.navigate("Joystick", {vehicle: this.state.navigation.state.params.vehicle})
  }

  stopManual(){
    this.setState({ onManual:false })
  }

  renderManualButton(){    

    let button

    if(this.state.onManual == false){
      button = <DefaultButton
        type={"green"}
        text={"Modo Manual"}
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

    var manualButton = this.renderManualButton()
    var missionButton = this.renderMissionButton()

    if (this.state.isInMission) {
      screen = (
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          {missionButton}
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
          {manualButton} 
          {missionButton}


        </ScrollView>
      )
    }

    return screen
  }
}

export default VehicleDetail;
