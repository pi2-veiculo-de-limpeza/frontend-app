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
            dir: 'False'
        }

        this.state = {
            esteira: motor,
            leftMotor: motor,
            rightMotor: motor,
            gps: {
                lat: '10.151',
                lon: '10.42'
            },
            acc: {
                x: '21.321',
                y: '0.1092',
                temp: '36.2'
            },
            volume: { value: 30 },
            weight: { value: 30 }
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
                    temp: msg_array[3]
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
            default:
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
                    {'\t'} duty cycle: { Math.abs(motor.pwm-100) }%
                </Text>
                <Text>
                    {'\t'} direction: {motor.dir == 'False' ? 'frente' : 'trás'}
                </Text>
            </View>
        </View>
    )
  }

  render() {
    return (  
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
            <View style={{marginVertical:15, padding:30, marginHorizontal:20, backgroundColor:'#F5FBFF', borderRadius: 10,}}>
                {this.renderMotor(this.state.leftMotor)}
                <Text>{'\n'}</Text>
                {this.renderMotor(this.state.rightMotor)}
                <Text>{'\n'}</Text>
                {this.renderMotor(this.state.esteira)}
                <Text>{'\n'}</Text>
            </View>
            <View style={{marginVertical:15, padding:30, marginHorizontal:20, backgroundColor:'#F5FBFF', borderRadius: 10,}}>
                <Text>GPS</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text>
                        {'\t'} latitude: {this.state.gps.lat}˚
                    </Text>
                    <Text>
                        {'\t'} longitude: {this.state.gps.lon}˚
                    </Text>
                </View>
            </View>
            <View style={{marginVertical:15, padding:30, marginHorizontal:20, backgroundColor:'#F5FBFF', borderRadius: 10,}}>
                <Text>Acelerometro</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text>
                        {'\t'} x: {this.state.acc.x}m/s²
                    </Text>
                    <Text>
                        {'\t'} y: {this.state.acc.y}m/s²
                    </Text>
                </View>
                <Text>
                    {'\t'} temp: {this.state.acc.temp}˚C
                </Text>
            </View>
            <View style={{marginVertical:15, padding:30, marginHorizontal:20, backgroundColor:'#F5FBFF', borderRadius: 10,}}>
                <Text>Volume</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text>
                        {'\t'} valor: {this.state.volume.value}cm³
                    </Text>
                </View>
                <Text>Peso</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text>
                        {'\t'} valor: {this.state.volume.value}g
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
  }
}

export default Sensors;
