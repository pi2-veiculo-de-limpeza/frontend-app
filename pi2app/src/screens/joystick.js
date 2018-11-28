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

  leftPress(evt){
    console.log(`left: ${evt.nativeEvent.locationX}`)
  }

  rightPress(evt){
    console.log(`right: ${evt.nativeEvent.locationX}`)
  }

  render() {
    
    const {params} = this.props.navigation.state;

    return (
        <View>
            <Text>{ params.vehicle.name }</Text>
            <Stick 
                leftPress={this.leftPress}
                leftWheelValue={this.state.leftWheelValue}

                rightPress={this.rightPress}
                rightWheelValue={this.state.rightWheelValue}
            />
        </View>
    )
  }
}

class Stick extends React.Component {

    render(){
        return (
            <View>

                {/* Left Wheel */}
                <View style={[StickStyle.backCircle, {marginLeft:20 ,marginTop:80}]}> 
                    <Draggable/>
                </View>

                {/* Right Wheel */}
                <View style={[StickStyle.backCircle, {marginLeft:20, marginTop:280}]}>
                    <Draggable/>
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
        // if(value.x > 10 || value.x < 50){
            this._val = value
        // }
        console.log(`value: ${value.x}`)
    }
  
    componentWillMount() {
      // Add a listener for the delta value change
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => {this.valueUpdate(value)} );
      // Initialize PanResponder with move handling
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderMove: (e, gestureState) => {

            // console.log(`before_set: ${this.state.pan.x._value}`)
            corrected_x = this.state.pan.x._value < 0 ? 0 : this.state.pan.x._value
            corrected_x = this.state.pan.x._value > 50 ? 50 : this.state.pan.x._value

            this.state.pan.setValue({ x:corrected_x, y:0})
            // console.log(`after_set: ${this.state.pan.x._value}`)
   
            Animated.event([
                    null,
                    {dx: this.state.pan.x, dy: 0},
                ])(e, gestureState)
            },
        onPanResponderRelease: (e, gesture) => {
            Animated.spring(this.state.pan, {
                toValue: { x: 0, y: 0 },
                friction: 5
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
