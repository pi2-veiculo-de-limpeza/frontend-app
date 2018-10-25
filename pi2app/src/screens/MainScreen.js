import React from 'react';
import { 
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements';
import { onSignOut, getUserToken } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

function shortDate(date) {
  return ('' + date.getHours() + ':' + date.getMinutes());
}

function getColorForBattery(battery_state, battery_capacity) {

  var color = 'green'
  var ratio = battery_state/battery_capacity

  if ( ratio < 0.35 ){
    color = 'red'
  }else if ( ratio < 0.67) {
    color = 'orange'
  }else{
    color = 'green'
  }

  return color;
}


class VehicleCard extends React.Component {
  render() {
    return (
      <View>
        <Card
          title={
            this.props.vehicle.name + ' - ' + 
            shortDate(this.props.vehicle.elapsed_time) }
          // image={require('../images/sand.jpg')}
          >

          <Text style={{color: 'gray'}}>
            Battery
            <Text style={{color: getColorForBattery(this.props.vehicle.battery_state, this.props.vehicle.battery_capacity)}}>
              {' ' +  this.props.vehicle.battery_state + '/' + this.props.vehicle.battery_capacity}
            </Text>
          </Text>

          <Text style={{color: 'gray'}}>
            Distance 
            <Text style={{color: 'black'}}> {this.props.vehicle.distance} </Text>
          </Text>

          <Text style={{color: 'gray'}}>
            Weight 
            <Text style={{color: 'black'}}> {this.props.vehicle.weight} </Text>
          </Text>

          <Text style={{color: 'gray'}}>
            Finish mission at
            <Text style={{color: 'black'}}> { shortDate(this.props.vehicle.estimated_time)} </Text>
          </Text>

        </Card>
      </View>
    );
  }

  
}


class MainScreen extends React.Component {
  state = {
    token: '',
    vehicles: [
      {
        name: 'Optimus Prime',
        battery_state: 1,
        battery_capacity: 3,
        weight: '10kg',
        distance: '200m',
        estimated_time: new Date(),
        elapsed_time: new Date()
      },
      {
        name: 'My Bot',
        battery_state: 2,
        battery_capacity: 3,
        weight: '10kg',
        distance: '200m',
        estimated_time: new Date(),
        elapsed_time: new Date()
      },
      {
        name: 'Master Cleaner',
        battery_state: 3,
        battery_capacity: 3,
        weight: '10kg',
        distance: '200m',
        estimated_time: new Date(),
        elapsed_time: new Date()
      },
    ]
  }

  componentWillMount(){
    getUserToken()
    .then(res => this.setState({ token: res }))
    .catch(err => alert("Erro"));
  }

  // Navigation header
  static navigationOptions = {
    title: 'SandBot',
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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.vehicleScrollView}>
        <View>
          {this.state.vehicles.map((vehicle, index) => {
            return (
              <VehicleCard
                  key={index}
                  vehicle={vehicle}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default MainScreen;
