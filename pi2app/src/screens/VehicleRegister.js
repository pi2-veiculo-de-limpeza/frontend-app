import React from 'react';
import { 
  View,
  Button,
  Text,
  TouchableOpacity, 
  Alert,
  ScrollView } from 'react-native';
  import styles from '../styles/GeneralStyles';
import { 
  FormLabel, 
  FormInput,
  FormValidationMessage, } from 'react-native-elements';
import { getUserToken, getUserId } from "../AuthMethods";

class VehicleRegister extends React.Component {
  state = {
    user_id: '',
    token: '',
    codeIsValid: true,
    robotCode: '',
    robotName: ''
  }

  // Navigation header
  static navigationOptions = {
    title: 'New Robot',
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

  componentWillMount(){
    getUserToken().then(res => this.setState({ token: res }))
      .catch(err => alert("Erro"));
    getUserId().then(res => this.setState({ user_id: res }))
      .catch(err => alert("Erro"));
  }

  validateCode(text){
    this.setState({ codeIsValid: text.length > 5 });
    this.setState({ robotCode: text });
  }

  checkResponseAndLaunchMessage(json){

    if (json != undefined){
      Alert.alert(
        'Robot Registerd!',
        '🤖',
        [
          {text: 'Thanks', onPress: () => this.props.navigation.navigate("MainScreen")},
        ],
        { cancelable: false }
      )
    }else{
      Alert.alert(
        'Could not Register Robot',
        'Server appears to be offline',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
    }
  }


  requestRegisteringOfNewVehicle = async () => {

		const vehicles_path = `${process.env.BACKEND}/vehicles`;

    bodyData = {
      code: this.state.robotCode,
      name: this.state.robotName,
      user_id: this.state.user_id
    }

		fetch(vehicles_path, {
			method: 'POST',
			headers: {
        'Content-Type': 'application/json',
        'Authorization' : this.state.token
      },
      body: JSON.stringify(bodyData)
		})
			.then((response) => { return response.json() })
			.then((responseJson) => {
        // Launch alert of created robot
        this.checkResponseAndLaunchMessage(responseJson)
			})
			.catch((err) => {
        this.checkResponseAndLaunchMessage(undefined)
				console.log(err);
			})
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.vehicleScrollView}>

        <View style={{ paddingHorizontal: 10 }}>
          <FormLabel>Robot Code</FormLabel>
            <FormInput 
              placeholder="42aQ7j4f"
              onChangeText={(text) => this.validateCode(text)}
              value={this.state.robotCode}
            />
            {this.state.codeIsValid == false &&
              <FormValidationMessage>Invalid code</FormValidationMessage>
            }
          <FormLabel>Robot Name</FormLabel>
            <FormInput 
              placeholder="Alfredo"
              onChangeText={(text) => this.setState( {robotName: text} )}
              value={this.state.robotName}
            />
        </View>

        <View style={{ flex: 1, alignItems: 'center', paddingVertical: 30 }}>
          <TouchableOpacity
            style={styles.registerVehicleButton}
            activeOpacity={0.7}
            onPress={() => this.requestRegisteringOfNewVehicle()}
          >
          <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default VehicleRegister;
