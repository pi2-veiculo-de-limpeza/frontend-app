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
import DefaultButton from "../components/DefaultButton";

class VehicleEdit extends React.Component {
  state = {
    user_id: '',
    token: '',
    codeIsValid: true,
    robotCode: '',
    robotName: ''
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
      }
    }
  };

  componentWillMount(){
    
    const {params} = this.props.navigation.state

    console.log(params.vehicle)

    this.setState({ robotCode: params.vehicle.code });
    this.setState({ robotName: params.vehicle.name });

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
        'Alterado com sucesso!',
        '🤖',
        [
          {text: 'Obrigado', onPress: () => this.props.navigation.pop()},
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

    //TODO: UPDATE SPECIFIC VEHICLE OBJ
    fetch(vehicles_path, {
      method: 'PUT',
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
          <FormLabel>Robot Name</FormLabel>
            <FormInput 
              placeholder="Alfredo"
              onChangeText={(text) => this.setState( {robotName: text} )}
              value={this.state.robotName}
            />
        </View>
        <DefaultButton 
          text={"Salvar"}
          onPress={() => this.requestRegisteringOfNewVehicle()}
        />

        <DefaultButton 
          text={"Destruir Robô"}
          type={"red"}
          onPress={() => console.log("Destroy all!") }
        />
      </ScrollView>
    );
  }
}

export default VehicleEdit;
