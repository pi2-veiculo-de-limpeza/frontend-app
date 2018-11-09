import React from "react";
import { 
  ScrollView, 
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator } from "react-native";
import { 
  Card, 
  Button, 
  FormLabel, 
  FormInput,
  FormValidationMessage } from "react-native-elements";
import axios from 'axios';
import { onSignIn } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailIsValid: false,
      passwordIsValid: false,
      isLoading: false,
    };
  }

  // General alert
  showAlert(title, body){
    Alert.alert(
      title,
      body,
      [
        {text: 'Ok', onPress: () => console.log('Ok pressed')},
      ],
      { cancelable: false }
    )
  }

  // Methods to handle POST to the API
  postForm = async () => {
    this.setState({isLoading: true});
    const userBody = {
      "email": this.state.email,
      "password": this.state.password
    }

    await axios.post(`${process.env.BACKEND}/sessions`, userBody)
    .then((response) => {
      var responseToken = response.data.token;
      var responseId = response.data._id.$oid;

      onSignIn(responseToken, responseId);
      this.setState({isLoading: false});
      this.props.navigation.navigate("MainScreen");
    })
    .catch((error) => {
      this.setState({isLoading: false});
      if (error.response.status === 404) {
        this.showAlert('Falha no Login', 'Email e/ou senha incorretos. Tente novamente.')
      } else if (error.request) {
        console.log(error.request);
      } else {
         console.log('Error', error.message);
      }
    })
  };

  submitRegister = () => {
    const titleAlert = 'Campo(s) Inválido(s)';
    const bodyAlert = 'Não foi possível realizar o cadastro porque existem entradas inválidas!';
    if(this.state.emailIsValid &&
       this.state.passwordIsValid){
      this.postForm();
    } else {
      this.showAlert(titleAlert, bodyAlert);
    }
  };

  // Navigation header
  static navigationOptions = {
    title: 'Login',
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

  // Methods to handle validity of inputs
  validateEmail = (text) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validEmail = emailRegex.test(text);
    
    if(validEmail){
      this.setState({ emailIsValid: true });
    } else {
      this.setState({ emailIsValid: false });
    }

    this.setState({ email: text });
  };

  validatePassword = (text) => {
    if(text.length > 5 && text.length < 19){
      this.setState({ passwordIsValid: true });
    } else {
      this.setState({ passwordIsValid: false })
    }

    this.setState({ password: text });
  };

  // Check to render next screen or isLoading
  renderContext(){
    if(this.state.isLoading == true){
      return (
          <ActivityIndicator size="large" color="#0000ff" />
      )
    }else{
      return (
        <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 100}} behavior='padding'>
          <ScrollView>
          <Card>
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType='email-address'
              placeholder="Digite seu e-mail"
              onChangeText={(text) => this.validateEmail(text)}
            />
            {this.state.emailIsValid == false && this.state.email.length != 0 &&
              <FormValidationMessage>Email inválido!</FormValidationMessage>
            }

            <FormLabel>Senha</FormLabel>
            <FormInput 
              secureTextEntry 
              placeholder="Digite sua senha"
              onChangeText={(text) => this.validatePassword(text)}
            />
            {this.state.passwordIsValid == false && this.state.password.length != 0 &&
              <FormValidationMessage>A senha deve ter entre 6 e 18 caracteres!</FormValidationMessage>
            }

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="Entrar"
              onPress={() => {this.submitRegister()}}
            />
          </Card>
          </ScrollView>
        </KeyboardAvoidingView>        
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

export default Login;