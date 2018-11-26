import React from 'react';
import { 
  View,
  Alert,
  ScrollView,
  ImageBackground, } from 'react-native';
import styles from '../styles/GeneralStyles';
import { 
  FormLabel, 
  FormInput,
  FormValidationMessage,
  Card, } from 'react-native-elements';
import { getUserToken, getUserId } from "../AuthMethods";
import DefaultButton from "../components/DefaultButton";
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

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
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}> 
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>

          <View style={{ paddingHorizontal: 10 }}>
            <Card> 
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
            </Card>  
          </View>
          <DefaultButton 
            text={"Cadastrar"}
            onPress={() => this.requestRegisteringOfNewVehicle()}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default VehicleRegister;
