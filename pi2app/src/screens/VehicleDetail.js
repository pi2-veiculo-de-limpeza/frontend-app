import React from 'react';
import { 
  View,
  ScrollView } from 'react-native';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';

class VehicleDetail extends React.Component {
  state = { 
    token: '',
    isInMission: true,
    onManual: false
  }

  // Navigation header
  static navigationOptions = {
    title: 'Vehicle Detail',
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
  };

  newMission(){
    this.setState({ isInMission:false })
  }

  stopMission(){
    this.setState({ isInMission:true })
  }

  startManual(){
    this.setState({ onManual:true })
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
        onPress={() => this.startManual()}
      />
    }else {
      button = <DefaultButton
        type={"red"}
        width={200}
        text={"Sair do Manual"}
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
        onPress={() => this.newMission()}
      />
    }else {
      button = <DefaultButton
        type={"red"}
        text={"Cancelar missão"}
        width={200}
        onPress={() => this.stopMission()}
      />
    }

    return button
  }

  render() {

    var screen;
    const {params} = this.props.navigation.state

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
          <View style={{ 
            flex: 1, 
            alignItems: 'center',
            height: 250,
            paddingVertical: 30,
            marginHorizontal: 10,
            backgroundColor: "gray" }}>
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
