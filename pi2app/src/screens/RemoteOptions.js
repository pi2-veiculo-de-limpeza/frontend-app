import React from 'react';
import {
  ImageBackground,
  View} from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";

class RemoteOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInStandby: true,
      ws: undefined,
      vehicle: undefined
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Opções',
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
      headerLeft: ( <Icon name={'chevron-left'} onPress={ () => { 
        if(ws != undefined){
            ws.close();
        }
        navigation.pop();
    } 
}  /> )
    }
  };

  componentWillUnmount(){
    if(ws != undefined){
        ws.close();
    }
  }

  componentDidMount(){
    const {params} = this.props.navigation.state;

    // console.log(params)
    this.state.ws = params.websocket
    this.state.vehicle = params.vehicle

    if(this.state.ws == undefined){
        console.log('UNDEFINED')
        return
    }

    this.state.ws.onmessage = (e) => {

      msg = e.data
      msg_array = msg.split(',');
      command = msg_array[0]

      switch(command) {
        case 'turn-on':
          this.setState({ isInStandby: false })
          break;
        case 'stand-by':
          this.setState({ isInStandby: true })
          break;
        default:
          break;
      }
      
    };

    this.state.ws.onerror = (e) => {
        // an error occurred
        // console.log(e.message);
    };

    this.state.ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };
  }

  renderButton(){
    let button

    if(!this.state.isInStandby){
      button = 
      <View>
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
          type={"yellow"}
          text={"Standby"}
          padding={15}
          onPress={() => { this.state.ws.send(`stand-by`)} }
          />
      </View>
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
        type={"blue"}
        text={"Controle"}
        padding={15}
        onPress={() => this.props.navigation.navigate("Joystick", {vehicle: this.state.vehicle, websocket: this.state.ws})}
        />
      </View>
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
        type={"blue"}
        text={"Sensores"}
        padding={15}
        onPress={() => this.props.navigation.navigate("Sensors", { ws: this.state.ws}) }
        />
      </View>
      </View>
    } else {
      button = 
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
        type={"green"}
        text={"Iniciar"}
        padding={15}
        onPress={() => { this.state.ws.send(`turn-on`) } }
        />
      </View>
    }

    return button
  }

  render(){
    var button = this.renderButton()

    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <View style={buttonStyles.optionsButtonsView}>
          {button}
        </View>
      </ImageBackground>
    )
  }
}

const buttonStyles = StyleSheet.create({
  optionsButtonsView: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 50,
  },

  spaceButtons: {
    padding: 50
  }
})

export default RemoteOptions;