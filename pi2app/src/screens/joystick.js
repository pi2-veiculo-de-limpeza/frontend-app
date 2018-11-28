import React from 'react';
import {
  Text, 
  View,
  TouchableOpacity ,
  PanResponder,
  Animated
} from "react-native";
import { Button } from 'react-native-elements';
import styles from '../styles/GeneralStyles';
import { StyleSheet } from 'react-native';
import DefaultButton from "../components/DefaultButton";

class Joystick extends React.Component {
  state = {
    token: '',
    isInMission: true,
    onManual: false,
    leftWheelValue: 0,
    rightWheelValue: 0
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

  correctValue(value){
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
        absolute = 0
    }

    return absolute
  }

  leftValueUpdate(value){
    value *= -2
    dir = value < 0? -1 : 1;

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
    
    console.log(`left: ${absolute}, ${dir}`)

    if(value >= 0 && value <= 100){
        ws.send(`left: ${absolute}, ${dir}`);
    }
    
  }

  rightValueUpdate(value){
    value *= -2
    dir = value < 0? -1 : 1;
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

    console.log(`right: ${absolute}, ${dir}`)
    
    if(value >= 0 && value <= 100){
        ws.send(`right: ${absolute}, ${dir}`);
    }
  }

  

  render() {
    
    const {params} = this.props.navigation.state;

    return (
        <View style={{
            marginTop:600,
        }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {/* Left Wheel */}
                <View style={[StickStyle.backCircle, {marginLeft:30}]}> 
                    <Draggable
                        valueUpdate={this.leftValueUpdate}
                    />
                </View>

                {/* Right Wheel */}
                <View style={[StickStyle.backCircle, {marginLeft:30}]}>
                    <Draggable 
                        valueUpdate={this.rightValueUpdate}
                    />
                </View>
            </View>
        </View>
    )
  }
}


const StickStyle = StyleSheet.create({
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
        // console.log(this.props);
        if (value > 0.1 || value < -0.1){
            this.props.valueUpdate(value);
        }else{
            this.props.valueUpdate(0);
        }
    }
  
    componentWillMount() {
      // Add a listener for the delta value change
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => {this.valueUpdate(value.y)} );
      // Initialize PanResponder with move handling
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderMove: (e, gestureState) => {

            // console.log(`before_set: ${this.state.pan.x._value}`)
            corrected = this.state.pan.y._value < 0 ? 0 : this.state.pan.y._value
            corrected = this.state.pan.y._value > 50 ? 50 : this.state.pan.y._value

            this.state.pan.setValue({ x:0, y:corrected})
            // console.log(`after_set: ${this.state.pan.x._value}`)
   
            Animated.event([
                    null,
                    {dx: 0, dy: this.state.pan.y},
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

var ws = new WebSocket('ws://localhost:8000');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};

// Connection opened
ws.addEventListener('open', function (event) {
    ws.send('Hello Server!');
});

// Listen for messages
ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});


export default Joystick;
