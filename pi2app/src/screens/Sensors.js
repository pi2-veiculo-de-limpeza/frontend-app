import React from 'react';
import { 
  View,
  Text,
  ScrollView
  } from 'react-native';
import styles from '../styles/GeneralStyles';

class Sensors extends React.Component {
    constructor(props) {
        super(props);

        motor = {
            name: 'motor',
            pwm: 0,
            dir: 0
        }

        this.state = {
            esteira: motor,
            leftMotor: motor,
            rightMotor: motor,
            gps: {},
            acc: {},
            volume: {},
            weight: {},
        };
      }

  // Navigation header
  static navigationOptions = {
    title: 'Sensores',
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

  componentDidMount(){
    const {params} = this.props.navigation.state;

    this.state.ws = params.ws

    if(this.state.ws == undefined){
        console.log('Websocket is undefined')
        return
    }else{
        ws = this.state.ws
    }

    this.state.ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);

        msg = e.data
        msg_array = msg.split(',');
        command = msg_array[0]

        switch(command) {
            case 'left':
                this.setState({leftMotor:{
                    name: msg_array[0], 
                    pwm: msg_array[1],
                    dir: msg_array[2]
                }})
                break;
            case 'right':
                this.setState({rightMotor:{
                    name: msg_array[0],
                    pwm: msg_array[1],
                    dir: msg_array[2]
                }})
                break;
            case 'esteira':
                this.setState({esteira:{
                    name: msg_array[0],
                    pwm: msg_array[1],
                    dir: msg_array[2]
                }})
                break;
            case 'gps':
                this.setState({gps:{
                    lat: msg_array[1],
                    lon: msg_array[2]
                }})
                break;
            case 'acc':
                this.setState({acc:{
                    x: msg_array[1],
                    y: msg_array[2],
                    z: msg_array[3]
                }})
                break;
            case 'volume':
                this.setState({volume:{
                    value: msg_array[1]
                }})
                break;
            case 'weight':
                this.setState({weight:{
                    value: msg_array[1]
                }})
                break;
        }
    };

    this.state.ws.onerror = (e) => {
        console.log(e.message);
    };

    this.state.ws.onclose = (e) => {
        console.log(e.code, e.reason);
    };

    // Connection opened
    this.state.ws.addEventListener('open', function (event) {
        // this.state.ws.send('Hello Server!');
    });

    // Listen for messages
    this.state.ws.addEventListener('message', function (event) {
        // console.log('Message from server ', event.data);
    });
  }

  renderMotor(motor){
    return (
        <View>
            <Text>{motor.name}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text>
                    {'\t'} PWM: {motor.pwm} 
                </Text>
                <Text>
                    {'\t'} direction: {motor.pwm}
                </Text>
            </View>
        </View>
    )
  }

  render() {
    return (  
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
            {this.renderMotor(this.state.leftMotor)}
            <Text>{'\n'}</Text>
            {this.renderMotor(this.state.rightMotor)}
            <Text>{'\n'}</Text>
            {this.renderMotor(this.state.esteira)}
            <Text>{'\n'}</Text>
        </ScrollView>
    );
  }
}

export default Sensors;
