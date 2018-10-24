import React from "react";
import { 
  ScrollView, 
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator } from "react-native";
import { 
  Card, 
  Button, 
  FormLabel, 
  FormInput,
  FormValidationMessage } from "react-native-elements";
import { onSignIn } from "../AuthMethods";

const initialBackgroundImage = require('pi2app/images/sand.jpg');

const styles = StyleSheet.create({
  initialBackgroundImage: {
    flex: 1,
    width: null,
  }
});

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

  // Methods to handle POST to the API
  postForm = async () => {
    this.setState({isLoading: true});
    // TODO: implement POST
    // TODO: change parameter of onSignIn to receive token from the POST request
    onSignIn(this.state.name)
    .then(() => this.props.navigation.navigate("MainScreen"));
    this.setState({isLoading: false});
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
    }else{
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
      <ImageBackground style={styles.initialBackgroundImage} source={initialBackgroundImage}>
        {this.renderContext()}
      </ImageBackground>
    )
  }
}

export default Register;