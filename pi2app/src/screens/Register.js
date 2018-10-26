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
import { 
  INITIAL_BACKGROUND_IMG, 
  BASE_URL } from '../constants/GeneralConstants';

class Register extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: '',
      nameIsValid: false,
      emailIsValid: false,
      passwordIsValid: false,
      confirmPassword: false,
      isLoading: false,
    };
  }

  // General alert
  showAlert(title, body){
    Alert.alert(
      title,
      body,
      [
      {text: 'Ok', onPress: () => console.log('Ok')},
      ],
      { cancelable: false }
    )
  }

  // Methods to handle POST to the API
  postForm = async () => {
    this.setState({isLoading: true});
    const userBody = {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password
    }

    await axios.post(`${BASE_URL}/users`, userBody)
    .then((response) => {
      var responseToken = response.data.token;
      var responseId = response.data._id.$oid;

      onSignIn(responseToken, responseId);
      this.setState({isLoading: false});
      this.props.navigation.navigate("MainScreen");
    })
    .catch((error) => {
      this.setState({isLoading: false});
      if (error.response.status === 422) {
        this.showAlert('Falha no cadastro', 'Esse email já está cadastrado. Coloque outro e tente novamente.')
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
    if(this.state.nameIsValid && 
       this.state.emailIsValid &&
       this.state.passwordIsValid &&
       this.state.confirmPassword){
      this.postForm();
    } else {
      this.showAlert(titleAlert, bodyAlert);
    }
  };

  // Navigation header
  static navigationOptions = {
    title: 'Cadastro',
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
  validateName = (text) => {
    const validName = text.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');

    if(validName.length > 3){
      this.setState({ nameIsValid: true });
    } else {
      this.setState({ nameIsValid: false })
    }

    this.setState({ name: validName });
  };

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

  comparePassword = (text) => {
    if(this.state.password === text){
      this.setState({ confirmPassword: true })
    } else {
      this.setState({ confirmPassword: false })
    }

    this.setState({ passwordAgain: text });
  };

  // Check to render next screen or isLoading
  renderContext(){
    if(this.state.isLoading == true){
      return (
          <ActivityIndicator size="large" color="#0000ff" />
      )
    } else {
      return (
        <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 50}} behavior='padding'>
          <ScrollView>
          <Card>
            <FormLabel>Nome</FormLabel>
            <FormInput 
              placeholder="Digite seu nome"
              onChangeText={(text) => this.validateName(text)}
              value={this.state.name}
            />
            {this.state.nameIsValid == false && this.state.name.length != 0 &&
              <FormValidationMessage>Nome inválido!</FormValidationMessage>
            }

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

            <FormLabel>Confirmação da Senha</FormLabel>
            <FormInput 
              secureTextEntry
              placeholder="Confirme sua senha"
              onChangeText={(text) => this.comparePassword(text)} 
            />
            {this.state.confirmPassword == false && this.state.passwordAgain.length != 0 &&
              <FormValidationMessage>As senhas digitadas são diferentes!</FormValidationMessage>
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

export default Register;