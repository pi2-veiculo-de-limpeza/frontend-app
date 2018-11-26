import React from 'react';
import {
  Text, 
  View,
  ImageBackground,
  ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class VehicleDetail extends React.Component {
  state = { 
    token: '',
    isInMission: false,
    onManual: false
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
    var screen;
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
            <Text>Mapa :)</Text>
          </View>

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
          {missionButton}

        </ScrollView>
      </ImageBackground>
      )
    }
  }

export default VehicleDetail;