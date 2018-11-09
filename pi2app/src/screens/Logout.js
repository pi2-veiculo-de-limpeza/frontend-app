import React from "react";
import { 
  ImageBackground,
  Alert,
  ActivityIndicator } from "react-native";
import axios from 'axios';
import { getUserToken, onSignOut } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class Logout extends React.Component{
  state = {
    token: '',
    isLoading: false,
  }

  componentDidMount(){
    this.getSessionToken();
    this.showAlert();
  }

  // Get token from AsyncStorage
  getSessionToken(){
    getUserToken()
    .then(res => this.setState({ token: res }))
    .catch(err => alert("Erro"))
  }

  showAlert(){
    Alert.alert(
    "Sair",
    "Desja mesmo sair da aplicação?",
    [
        {text: 'Sim', onPress: () => this.confirmLogout()},
        {text: 'Não', onPress: () => this.cancelLogout()},
    ],
    { cancelable: false }
    )
  }

  cancelLogout(){
    this.props.navigation.popToTop();
    this.props.navigation.goBack('MainScreen');
  }

  // Methods to handle POST to the API
  confirmLogout = async () => {
    this.setState({isLoading: true});

    await axios.delete(`${process.env.BACKEND}/sessions/destroy`, { data: { token: this.state.token } })
    .then(() => {
      onSignOut();
      this.setState({isLoading: false});
      this.props.navigation.navigate("InitialScreen");
    })
    .catch((error) => {
      this.setState({isLoading: false});
      if (error.response) {
        console.log(error.request);        
      } else if (error.request) {
        console.log(error.request);
      } else {
         console.log('Error', error.message);
      }
    })
  };

  static navigationOptions = {
    header: null,
  };

  renderContext(){
    if(this.state.isLoading == true){
      return (
        <ActivityIndicator size="large" color="#0000ff" />
     )
    }
  }

  render(){
    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        {this.renderContext()}
      </ImageBackground>
    )
  }
}

export default Logout;