import React from 'react';
import { 
  View,
  PanResponder,
  Animated
} from "react-native";
import {Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import DefaultButton from "../components/DefaultButton";


ws = undefined

class Joystick extends React.Component {
  state = {
    token: '',
    isInMission: true,
    matState: false,
    onManual: false,
    leftWheelValue: 0,
    rightWheelValue: 0,
    ws: undefined
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
      headerLeft: ( <Icon name={'chevron-left'} onPress={ () => { 
                console.log("HELLO !!")
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

    if(this.state.ws == undefined){
        console.log('UNDEFINED')
        return
    }else{
        ws = this.state.ws
    }

    this.state.ws.onmessage = (e) => {
        // a message was received
        // console.log(e.data);
    };

    this.state.ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
    };

    this.state.ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };

    // Connection opened
    this.state.ws.addEventListener('open', function (event) {
        // this.state.ws.send('Hello Server!');
    });
  }

  filterValue(value){
    absolute = Math.abs(value)

    if(absolute <= 1){
        absolute = 0
    }else if(absolute < 9){
        absolute = 10
    }else if(absolute < 19){
        absolute = 20
    }else if(absolute < 29){
        absolute = 30
    }else if(absolute < 39){
        absolute = 40
    }else if(absolute < 49){
        absolute = 50
    }else if(absolute < 59){
        absolute = 60
    }else if(absolute < 69){
        absolute = 70
    }else if(absolute < 79){
        absolute = 80
    }else if(absolute < 89){
        absolute = 90
    }else if(absolute <= 100){
        absolute = 100
    }else{
        absolute = 100
    }

    return absolute
  }

  valueUpdate = (value) => {
    dir = 1

    left_dir = 1
    right_dir = 1

    var angleRadians = Math.atan2(value.y * -1, value.x);
    var degrees = angleRadians * 180 / Math.PI;
    degrees = degrees < 0 ? degrees + 360 : degrees

    var speed = Math.sqrt( Math.pow(value.x, 2) + Math.pow(value.y, 2) )
    speed = this.filterValue(speed)
    console.log(`${degrees} : ${speed}`)

    if (degrees >= 45 && degrees < 135){
        left_dir  = 1
        right_dir = 1
    }else if(degrees >= 135 && degrees < 225){
        left_dir  = -1
        right_dir = 1
    }else if(degrees >= 225 && degrees < 315){
        left_dir  = -1
        right_dir = -1
    }else {
        left_dir  = 1
        right_dir = -1
    }

    if (speed >= 20){
        this.state.ws.send(`left,${speed},${left_dir}`);
        this.state.ws.send(`right,${speed},${right_dir}`);
    }else{
        this.state.ws.send(`left,${0},${1}`);
        this.state.ws.send(`right,${0},${1}`);
    }
  }

  turnMatOn(){
    this.state.ws.send(`turn-on-mat`);
    this.setState({ matState:true })
  }

  turnMatOff(){
    this.state.ws.send(`turn-off-mat`);
    this.setState({ matState:false })
  }

  renderMatHandler(){

    let button

    if(this.state.matState == false){
      button = <DefaultButton
        type={"green"}
        text={"Ligar Esteira"}
        padding={15}
        onPress={() => this.turnMatOn()}
      />
    }else {
      button = <DefaultButton
        type={"red"}
        text={"Desligar Esteira"}
        padding={15}
        onPress={() => this.turnMatOff()}
      />
    }

    return button
  }

  render() {

    return (
        <View>
            {this.renderMatHandler()} 
            <View style={{
                marginTop:200,
                alignItems:'center'
            }}>
                {/* Movement Wheel */}
                <View style={[StickStyle.backCircle]}> 
                    <Draggable
                        valueUpdate={this.valueUpdate}
                    />
                </View>
                
            </View>
        </View>
    )
  }
}


const StickStyle = StyleSheet.create({

    background: {
        width: 500,
        height: 800,
        opacity: 0.0
    },

    frontCircle: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#7F640F'
    },

    backCircle: {
        alignItems: 'center',
        justifyContent:'center',
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: '#FFC81D'
    }
  
});

class Draggable extends React.Component {
    constructor() {
      super();
      this.state = {
        pan: new Animated.ValueXY()
      };
    }

    valueUpdate(value){
        this.props.valueUpdate(value);
    }
  
    componentWillMount() {
      // Add a listener for the delta value change
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => {this.valueUpdate(value)} );
      // Initialize PanResponder with move handling
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderMove: (e, gestureState) => {
            Animated.event([
                    null,
                    {dx: this.state.pan.x, dy: this.state.pan.y},
                ])(e, gestureState)
            },
        onPanResponderRelease: (e, gesture) => {
            Animated.spring(this.state.pan, {
                toValue: { x: 0, y: 0 },
                friction: 10
            }).start();
            }
      });
      
    }
  
    render() {
      const panStyle = {
        transform: this.state.pan.getTranslateTransform()
      }
      return (
        <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, StickStyle.frontCircle]}
        />
      );
    }
}

export default Joystick;
