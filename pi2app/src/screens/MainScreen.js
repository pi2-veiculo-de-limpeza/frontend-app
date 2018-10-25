import React from 'react';
import { 
  Text,
  View,
  ImageBackground,
  ScrollView,
  RefreshControl } from 'react-native';
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
            Finishes mission at
            <Text style={{color: 'black'}}> { shortDate(this.props.vehicle.estimated_time)} </Text>
          </Text>

        </Card>
      </View>
    );
  }

  
}


class MainScreen extends React.Component {
  state = {
    refreshing: true,
    token: '',
    vehicles: []

  }

  addNewVehicle(name='SandBot', battery_state=3, battery_capacity=3, weight=0, distance=0, estimated_time=new Date(), elapsed_time=new Date()){

    var newVehicle = {
      name: name,
      battery_state: battery_state,
      battery_capacity: battery_capacity,
      weight: weight,
      distance: distance,
      estimated_time: estimated_time,
      elapsed_time: elapsed_time
    }

    this.state.vehicles.push(newVehicle)
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

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.loadVehicles().then(() => {
			this.setState({refreshing: false});
		});
	}

  loadVehicles = async () => {
		const { state } = this.props.navigation;
		var token = 'YOU TOKEN HERE'
		const vehicles_path = `${process.env.BACKEND}/vehicles`;

    // console.log(vehicles_path)

		fetch(vehicles_path, {
			method: 'GET',
			headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
			}
		})
			.then((response) => { return response.json() })
			.then((responseJson) => {
        //Clear vehicles
        this.state.vehicles=[]

        //Insert current vehicles
        responseJson.map((json_vehicle, index) => {
          this.addNewVehicle(name=json_vehicle.name);
        })
        
				this.setState({refreshing: false});
			})
			.catch((err) => {
				console.log(err);
			})
  }

  componentWillMount() {
		this.loadVehicles();
	}

  render() {
    return (
      <ScrollView contentContainerStyle={styles.vehicleScrollView} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
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
