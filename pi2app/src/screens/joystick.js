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

  leftValueUpdate(value){
    console.log(`left: ${value}`)
  }

  rightValueUpdate(value){
    console.log(`right: ${value}`)
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
        if (value > 0.01 || value < -0.01){
            this.props.valueUpdate(value);
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


export default Joystick;
