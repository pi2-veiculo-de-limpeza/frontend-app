import React from 'react';
import {
  View,
  Alert } from 'react-native';
import Dialog from "react-native-dialog";



class RemoteHandle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: [],
      isLoading: false,
      vehicleInfo: {},
      navigation: undefined,
      isDialogVisible: true,
      ip: ''
    }
  }

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

      vehicle = {
          name: 'Bot'
      }

      this.props.submit(vehicle, ws)
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

  render(){
    return(
        <View>
        <Dialog.Container visible={this.state.isDialogVisible}>
            <Dialog.Title>LAN IP address</Dialog.Title>
            <Dialog.Input text={this.state.ip} onChangeText={(ip) => this.handleIp(ip)}
            ></Dialog.Input>
            <Dialog.Button label="Cancel" onPress={() => {this.setState({isDialogVisible: false})} } />
            <Dialog.Button label="Submit" onPress={this.beginJoystick} />
        </Dialog.Container>
        </View>
    )
  }
}

export default RemoteHandle;