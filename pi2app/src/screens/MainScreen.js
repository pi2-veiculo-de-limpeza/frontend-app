import React from 'react';
import { 
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  RefreshControl } from 'react-native';
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements';
import { onSignOut, getUserToken } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import VehicleCard from '../components/VehicleCard';



class MainScreen extends React.Component {
  state = {
    refreshing: true,
    token: '',
    vehicles: []
  }

  addNewVehicle(name='SandBot', battery_state=3, battery_capacity=3, weight='0kg', distance='0m', estimated_time=new Date(), elapsed_time=new Date()){

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
  static navigationOptions = ({ navigation }) => {
    return {
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
      headerRight:<Icon raised name='plus' type='font-awesome' color='green' onPress={ () => navigation.navigate("VehicleRegister") } />
    }
  };

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.loadVehicles().then(() => {
			this.setState({refreshing: false});
		});
	}

  loadVehicles = async () => {
		const vehicles_path = `${process.env.BACKEND}/vehicles`;

		fetch(vehicles_path, {
			method: 'GET',
			headers: {
        'Content-Type': 'application/json',
        'Authorization' : this.state.token
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
                  navigation={this.props.navigation}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default MainScreen;
