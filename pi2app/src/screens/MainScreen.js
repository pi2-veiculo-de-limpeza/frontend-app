import React from 'react';
import { 
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements';
import { getUserToken, getUserId } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import VehicleCard from '../components/VehicleCard';
import DefaultButton from "../components/DefaultButton";

class MainScreen extends React.Component {
  state = {
    refreshing: false,
    vehicles: [],
    userToken: '',
    userId: ''
  }
  componentDidMount(){
    
    this._onRefresh();
    this.props.navigation.addListener('willFocus', this._onRefresh );
  }

  componentWillMount(){
    getUserToken().then(res => this.setState({ userToken: res }))
      .catch(err => alert("Erro"));
    getUserId().then(res => this.setState({ userId: res }))
      .catch(err => alert("Erro"));
  }

  addNewVehicle(name='SandBot', 
                code='123abc', 
                vehicleId=0,
                userToken=0,
                battery_state=3, 
                battery_capacity=3, 
                weight='0kg', 
                distance='0m', 
                estimated_time=new Date(), 
                elapsed_time=new Date()){

    var newVehicle = {
      name: name,
      battery_state: battery_state,
      battery_capacity: battery_capacity,
      weight: weight,
      distance: distance,
      estimated_time: estimated_time,
      elapsed_time: elapsed_time,
      code: code,
      vehicleId: vehicleId,
      userToken: userToken
    }

    this.state.vehicles.push(newVehicle)
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
      headerRight:
            <Icon
              raised name='plus' 
              type='font-awesome' 
              color='green' 
              onPress={ () => navigation.navigate("VehicleRegister") } 
            />
    }
  };

	_onRefresh = () => {

    if(this.state.refreshing) return;
    // console.log("Refreshing...")
    this.setState({refreshing: true});
    
		this.loadVehicles()
	}

  loadVehicles = async () => {

    // wait 1s for db get userToken
    if (this.state.userToken == undefined || this.state.userToken == ""){
      await sleep(1000);
    }

		const vehicles_path = `${process.env.BACKEND}/vehicles`;

		fetch(vehicles_path, {
			method: 'GET',
			headers: {
        'Content-Type': 'application/json',
        'Authorization' : this.state.userToken
			}
		})
			.then((response) => {
        return response.json()
      })
			.then((responseJson) => {
        //Clear vehicles
        this.state.vehicles = [];

        console.log(responseJson)

        //Insert current vehicles
        responseJson.map((json_vehicle, index) => {

          console.log(json_vehicle)

          this.addNewVehicle(
            name=json_vehicle.name,
            code=json_vehicle.code,
            vehicleId=json_vehicle._id.$oid,
            userToken=this.state.userToken
            );
        })
        
        // console.log("Vehicle response")
        this.setState({refreshing: false});

        return
			})
			.catch((err) => {
        this.setState({refreshing: false});
				console.log(err);
      })
      
    return 1;
  }

  render() {
    return (
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <ScrollView contentContainerStyle={styles.vehicleScrollView} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          <View>
          {this.state.vehicles.length == 0 && !this.state.refreshing &&
            <Card
              title={ "Nenhum veículo cadastrado!" }
              >
              <Text style={{color: 'black'}}>
                Para cadastrarar um veículo, aperte no ícone de + no canto superior direito.
              </Text>
            </Card>
            }
            {this.state.vehicles.map((vehicle, index) => {
              return (
                <TouchableHighlight 
                key={index}
                onPress={ () => { this.props.navigation.navigate("VehicleDetail", {vehicle:vehicle}) }}>
                  <VehicleCard
                      vehicle={vehicle}
                  />
                </TouchableHighlight>
              );
            })}
          </View>
        
        <View style={{flex: 1, flexDirection: 'row'}}>
          <DefaultButton 
            text={"Logout"}
            type={"blue"}
            onPress={() => this.props.navigation.navigate("Logout")}            
          />

          <DefaultButton 
            text={"Editar conta"}
            type={"blue"}
            onPress={() => this.props.navigation.navigate("UpdateUserInfo", {
              userToken: this.state.userToken,
              userId: this.state.userId})}
          />
        </View>
        </ScrollView>
      </ImageBackground>

    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default MainScreen;
